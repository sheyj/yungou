package org.springframework.cglib.proxy;

import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Set;
import org.springframework.asm.ClassVisitor;
import org.springframework.asm.Type;
import org.springframework.cglib.core.ClassEmitter;
import org.springframework.cglib.core.ClassInfo;
import org.springframework.cglib.core.CodeEmitter;
import org.springframework.cglib.core.Constants;
import org.springframework.cglib.core.EmitUtils;
import org.springframework.cglib.core.MethodInfo;
import org.springframework.cglib.core.MethodWrapper;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.cglib.core.Signature;
import org.springframework.cglib.core.TypeUtils;

/**
 * @author Chris Nokleberg
 * @version $Id: MixinEmitter.java,v 1.9 2006/08/27 21:04:37 herbyderby Exp $
 */
class MixinEmitter extends ClassEmitter {
    private static final String FIELD_NAME = "CGLIB$DELEGATES";
    private static final Signature CSTRUCT_OBJECT_ARRAY =
      TypeUtils.parseConstructor("Object[]");
    private static final Type MIXIN =
      TypeUtils.parseType("net.sf.cglib.proxy.Mixin");
    private static final Signature NEW_INSTANCE =
      new Signature("newInstance", MIXIN, new Type[]{ Constants.TYPE_OBJECT_ARRAY });

    public MixinEmitter(ClassVisitor v, String className, Class[] classes, int[] route) {
        super(v);

        begin_class(Constants.V1_2,
                    Constants.ACC_PUBLIC,
                    className,
                    MIXIN,
                    TypeUtils.getTypes(getInterfaces(classes)),
                    Constants.SOURCE_FILE);
        EmitUtils.null_constructor(this);
        EmitUtils.factory_method(this, NEW_INSTANCE);

        declare_field(Constants.ACC_PRIVATE, FIELD_NAME, Constants.TYPE_OBJECT_ARRAY, null);

        CodeEmitter e = begin_method(Constants.ACC_PUBLIC, CSTRUCT_OBJECT_ARRAY, null);
        e.load_this();
        e.super_invoke_constructor();
        e.load_this();
        e.load_arg(0);
        e.putfield(FIELD_NAME);
        e.return_value();
        e.end_method();

        Set unique = new HashSet();
        for (int i = 0; i < classes.length; i++) {
            Method[] methods = getMethods(classes[i]);
            for (int j = 0; j < methods.length; j++) {
                if (unique.add(MethodWrapper.create(methods[j]))) {
                    MethodInfo method = ReflectUtils.getMethodInfo(methods[j]);
                    e = EmitUtils.begin_method(this, method, Constants.ACC_PUBLIC);
                    e.load_this();
                    e.getfield(FIELD_NAME);
                    e.aaload((route != null) ? route[i] : i);
                    e.checkcast(method.getClassInfo().getType());
                    e.load_args();
                    e.invoke(method);
                    e.return_value();
                    e.end_method();
                }
            }
        }

        end_class();
    }

    protected Class[] getInterfaces(Class[] classes) {
        return classes;
    }

    protected Method[] getMethods(Class type) {
        return type.getMethods();
    }
}
