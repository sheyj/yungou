package org.springframework.cglib.core;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.lang.reflect.Constructor;
import java.security.AccessController;
import java.security.PrivilegedAction;

import org.springframework.asm.ClassReader;
import org.springframework.asm.ClassVisitor;
import org.springframework.asm.ClassWriter;
import org.springframework.asm.Opcodes;

public class DebuggingClassWriter extends ClassVisitor {

	public static final String DEBUG_LOCATION_PROPERTY = "cglib.debugLocation";

	private static String debugLocation;
	private static Constructor traceCtor;

	private String className;
	private String superName;

	static {
		debugLocation = System.getProperty(DEBUG_LOCATION_PROPERTY);
		if (debugLocation != null) {
			System.err.println("CGLIB debugging enabled, writing to '" + debugLocation + "'");
			try {
				Class clazz = Class.forName("org.objectweb.asm.util.TraceClassVisitor");
				traceCtor = clazz.getConstructor(new Class[] { ClassVisitor.class, PrintWriter.class });
			}
			catch (Throwable ignore) {
			}
		}
	}

	public DebuggingClassWriter(int flags) {
		super(Opcodes.ASM4, new ClassWriter(flags));
	}

	public void visit(int version, int access, String name, String signature, String superName, String[] interfaces) {
		className = name.replace('/', '.');
		this.superName = superName.replace('/', '.');
		super.visit(version, access, name, signature, superName, interfaces);
	}

	public String getClassName() {
		return className;
	}

	public String getSuperName() {
		return superName;
	}

	public byte[] toByteArray() {

		return (byte[]) java.security.AccessController.doPrivileged(new java.security.PrivilegedAction() {
			public Object run() {

				byte[] b = ((ClassWriter) DebuggingClassWriter.super.cv).toByteArray();
				if (debugLocation != null) {
					String dirs = className.replace('.', File.separatorChar);
					try {
						new File(debugLocation + File.separatorChar + dirs).getParentFile().mkdirs();

						File file = new File(new File(debugLocation), dirs + ".class");
						OutputStream out = new BufferedOutputStream(new FileOutputStream(file));
						try {
							out.write(b);
						}
						finally {
							out.close();
						}

						if (traceCtor != null) {
							file = new File(new File(debugLocation), dirs + ".asm");
							out = new BufferedOutputStream(new FileOutputStream(file));
							try {
								ClassReader cr = new ClassReader(b);
								PrintWriter pw = new PrintWriter(new OutputStreamWriter(out));
								ClassVisitor tcv = (ClassVisitor) traceCtor.newInstance(new Object[] { null, pw });
								cr.accept(tcv, 0);
								pw.flush();
							}
							finally {
								out.close();
							}
						}
					}
					catch (Exception e) {
						throw new CodeGenerationException(e);
					}
				}
				return b;
			}
		});

	}
}
