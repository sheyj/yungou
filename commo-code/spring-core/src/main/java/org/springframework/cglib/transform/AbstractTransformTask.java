package org.springframework.cglib.transform;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.util.zip.CRC32;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.apache.tools.ant.Project;
import org.springframework.asm.Attribute;
import org.springframework.asm.ClassReader;
import org.springframework.asm.ClassWriter;
import org.springframework.cglib.core.ClassNameReader;
import org.springframework.cglib.core.DebuggingClassWriter;

abstract public class AbstractTransformTask extends AbstractProcessTask {
    private static final int ZIP_MAGIC = 0x504B0304;

    private static final int CLASS_MAGIC = 0xCAFEBABE;

    private boolean verbose;

    public void setVerbose(boolean verbose) {
        this.verbose = verbose;
    }

    /**
     * returns transformation for source class
     * 
     * @param classInfo
     *            class information 
     *            class name := classInfo[ 0 ] 
     *            super class  name := classInfo[ 1 ]
     *            interfaces := classInfo[ >1 ]
     */
    abstract protected ClassTransformer getClassTransformer(String[] classInfo);

    protected Attribute[] attributes() {
        return null;
    }

    protected void processFile(File file) throws Exception {

        if (isClassFile(file)) {

            processClassFile(file);

        } else if (isJarFile(file)) {

            processJarFile(file);

        } else {
            
            log("ignoring " + file.toURI(), Project.MSG_WARN);
            
        }
    }

    /**
     * @param file
     * @throws Exception
     * @throws FileNotFoundException
     * @throws IOException
     * @throws MalformedURLException
     */
    private void processClassFile(File file) throws Exception,
            FileNotFoundException, IOException, MalformedURLException {

        ClassReader reader = getClassReader(file);
        String name[] = ClassNameReader.getClassInfo(reader);
        DebuggingClassWriter w =
        	new DebuggingClassWriter(ClassWriter.COMPUTE_MAXS);
        ClassTransformer t = getClassTransformer(name);
        if (t != null) {

            if (verbose) {
                log("processing " + file.toURI());
            }
            new TransformingClassGenerator(new ClassReaderGenerator(
                    getClassReader(file), attributes(), getFlags()), t)
                    .generateClass(w);
            FileOutputStream fos = new FileOutputStream(file);
            try {
                fos.write(w.toByteArray());
            } finally {
                fos.close();
            }

        }

    }

    protected int getFlags() {
        return 0;
    }

    private static ClassReader getClassReader(File file) throws Exception {
        InputStream in = new BufferedInputStream(new FileInputStream(file));
        try {
            ClassReader r = new ClassReader(in);
            return r;
        } finally {
            in.close();
        }

    }

    protected boolean isClassFile(File file) throws IOException {

        return checkMagic(file, CLASS_MAGIC);

    }

    protected void processJarFile(File file) throws Exception {

        if (verbose) {
            log("processing " + file.toURI());
        }
        
        File tempFile = File.createTempFile(file.getName(), null, new File(file
                .getAbsoluteFile().getParent()));
        try{
            
            ZipInputStream zip = new ZipInputStream(new FileInputStream(file));
            try {
                FileOutputStream fout = new FileOutputStream(tempFile);
                try{
                 ZipOutputStream out = new ZipOutputStream(fout);
                                
                    ZipEntry entry;
                    while ((entry = zip.getNextEntry()) != null) {
                        
                        
                        byte bytes[] = getBytes(zip);
                        
                        if (!entry.isDirectory()) {
                            
                            DataInputStream din = new DataInputStream(
                                              new ByteArrayInputStream(bytes)
                                            );
                            
                            if (din.readInt() == CLASS_MAGIC) {
                                
                                bytes = process(bytes);
                                                        
                            } else {
                                if (verbose) {
                                 log("ignoring " + entry.toString());
                                }
                            }
                        }
                       
                        ZipEntry outEntry = new ZipEntry(entry.getName());
                        outEntry.setMethod(entry.getMethod());
                        outEntry.setComment(entry.getComment());
                        outEntry.setSize(bytes.length);
                        
                        
                        if(outEntry.getMethod() == ZipEntry.STORED){
                            CRC32 crc = new CRC32();
                            crc.update(bytes);
                            outEntry.setCrc( crc.getValue() );
                            outEntry.setCompressedSize(bytes.length);
                        }
                        out.putNextEntry(outEntry);
                        out.write(bytes);
                        out.closeEntry();
                        zip.closeEntry();
                        
                    }
                    out.close(); 
                }finally{
                 fout.close();    
                } 
            } finally {
                zip.close();
            }
            
            
            if(file.delete()){
                
                File newFile = new File(tempFile.getAbsolutePath());
                
                if(!newFile.renameTo(file)){
                    throw new IOException("can not rename " + tempFile + " to " + file);   
                }
                
            }else{
                throw new IOException("can not delete " + file);
            }
            
        }finally{
            
            tempFile.delete();
            
        }
        
    }

    /**
     * @param bytes
     * @return
     * @throws IOException
     * @throws Exception
     */
    private byte[] process(byte[] bytes) throws Exception {

        ClassReader reader = new ClassReader(new ByteArrayInputStream(bytes));
        String name[] = ClassNameReader.getClassInfo(reader);
        DebuggingClassWriter w =
        	new DebuggingClassWriter(ClassWriter.COMPUTE_MAXS);
        ClassTransformer t = getClassTransformer(name);
        if (t != null) {
            if (verbose) {
                log("processing " + name[0]);
            }
            new TransformingClassGenerator(new ClassReaderGenerator(
                    new ClassReader(new ByteArrayInputStream(bytes)),
                    attributes(), getFlags()), t).generateClass(w);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            out.write(w.toByteArray());
            return out.toByteArray();
        }
        return bytes;
    }

    /**
     * @param zip
     * @return
     * @throws IOException
     */
    private byte[] getBytes(ZipInputStream zip) throws IOException {

        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        InputStream in = new BufferedInputStream(zip);
        int b;
        while ((b = in.read()) != -1) {
            bout.write(b);
        }
        return bout.toByteArray();
    }

    private boolean checkMagic(File file, long magic) throws IOException {
        DataInputStream in = new DataInputStream(new FileInputStream(file));
        try {
            int m = in.readInt();
            return magic == m; 
        } finally {
            in.close();
        }
    }

    protected boolean isJarFile(File file) throws IOException {
        return checkMagic(file, ZIP_MAGIC);
    }

}
