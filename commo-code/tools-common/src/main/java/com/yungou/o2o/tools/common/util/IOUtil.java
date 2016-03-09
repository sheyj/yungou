package com.yungou.o2o.tools.common.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.io.Writer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 */
public final class IOUtil
{
    private static final Logger LOG = LoggerFactory.getLogger(IOUtil.class);
    
    public static <V extends InputStream> V close(V in)
    {
        if (in != null)
        {
            try
            {
                in.close();
            }
            catch (Exception e)
            {
                
            }
        }
        return null;
    }
    
    public static <V extends OutputStream> V close(V out)
    {
        if (out != null)
        {
            try
            {
                out.flush();
            }
            catch (Exception e)
            {
                
            }
            try
            {
                out.close();
            }
            catch (Exception e)
            {
                
            }
        }
        return null;
    }
    
    /*
     * public static void close(ZipFile zipFile) { if(zipFile == null){ return;
     * } try { zipFile.close(); } catch (IOException e1) { }
     * 
     * try{ ZipFile.closeQuietly(zipFile); } catch (Exception e){ try {
     * zipFile.close(); } catch (IOException e1) { } } }
     */
    
    public static <V extends Reader> V close(V in)
    {
        if (in != null)
        {
            try
            {
                in.close();
            }
            catch (Exception e)
            {
                
            }
        }
        return null;
    }
    
    public static <V extends Writer> V close(V out)
    {
        if (out != null)
        {
            try
            {
                out.flush();
            }
            catch (Exception e)
            {
                
            }
            try
            {
                out.close();
            }
            catch (Exception e)
            {
                
            }
        }
        return null;
    }
    
    /**
     * Copy bytes from an <code>InputStream</code> to an
     * <code>OutputStream</code>.
     * 
     * @param input the <code>InputStream</code> to read from
     * @param output the <code>OutputStream</code> to write to
     * @return the number of bytes copied
     * @throws IOException In case of an I/O problem
     */
    public static int copy(InputStream input, OutputStream output) throws IOException
    {
        byte[] buffer = new byte[1024 * 4];
        int count = 0;
        int n = 0;
        while (-1 != (n = input.read(buffer)))
        {
            output.write(buffer, 0, n);
            count += n;
        }
        return count;
    }
    
    public static int copyAndClose(InputStream input, OutputStream output) throws IOException
    {
        int ret = 0;
        try
        {
            ret = copy(input, output);
        }
        finally
        {
            close(input);
            close(output);
        }
        return ret;
    }
    
    /**
     * <p> Writes data to a file. The file will be created if it does not exist.
     * </p> <p> There is no readFileToString method without encoding parameter
     * because the default encoding can differ between platforms and therefore
     * results in inconsistent results. </p>
     * 
     * @param file the file to write.
     * @param data The content to write to the file.
     * @param encoding encoding to use
     * @throws IOException in case of an I/O error
     * @throws UnsupportedEncodingException if the encoding is not supported by
     *             the VM
     */
    public static void writeStringToFile(File file, String data, String encoding) throws IOException
    {
        writeBytesToFile(file, data.getBytes(encoding));
    }
    
    /**
     * write bytes to file
     * 
     * @param file
     * @param data
     * @throws IOException
     */
    public static void writeBytesToFile(File file, byte[] data) throws IOException
    {
        writeBytesToFile(file, data, 0, data.length);
    }
    
    public static void writeBytesToFile(File file, byte[] data, int off, int len) throws IOException
    {
        OutputStream out = new java.io.FileOutputStream(file);
        try
        {
            out.write(data, off, len);
            out.flush();
        }
        finally
        {
            close(out);
        }
    }
    
    /**
     * write bytes to file
     * 
     * @param file
     * @param data
     * @throws IOException
     */
    public static void writeStreamToFile(File file, InputStream in) throws IOException
    {
        OutputStream out = new java.io.FileOutputStream(file);
        try
        {
            copy(in, out);
            out.flush();
        }
        finally
        {
            close(out);
        }
    }
    
    /**
     * Implements the same behaviour as the "touch" utility on Unix. It creates
     * a new file with size 0 or, if the file exists already, it is opened and
     * closed without modifying it, but updating the file date and time.
     * 
     * @param file the File to touch
     * @throws IOException If an I/O problem occurs
     */
    public static void touch(File file) throws IOException
    {
        OutputStream out = new java.io.FileOutputStream(file);
        close(out);
    }
    
    /**
     * Recursively count size of a directory (sum of the length of all files).
     * 
     * @param directory directory to inspect
     * @return size of directory in bytes.
     */
    public static long sizeOfDirectory(File directory)
    {
        if (!directory.exists())
        {
            String message = directory + " does not exist";
            throw new IllegalArgumentException(message);
        }
        
        if (!directory.isDirectory())
        {
            String message = directory + " is not a directory";
            throw new IllegalArgumentException(message);
        }
        
        long size = 0;
        
        File[] files = directory.listFiles();
        for (File file : files)
        {
            if (file.isDirectory())
            {
                size += sizeOfDirectory(file);
            }
            else
            {
                size += file.length();
            }
        }
        
        return size;
    }
    
    /**
     * <p> Reads the contents of a file into a String. </p> <p> There is no
     * readFileToString method without encoding parameter because the default
     * encoding can differ between platforms and therefore results in
     * inconsistent results. </p>
     * 
     * @param file the file to read.
     * @param encoding the encoding to use
     * @return The file contents or null if read failed.
     * @throws IOException in case of an I/O error
     * @throws UnsupportedEncodingException if the encoding is not supported by
     *             the VM
     */
    public static String readFileToString(File file, String encoding) throws IOException
    {
        InputStream in = new java.io.FileInputStream(file);
        try
        {
            return readStreamToString(in, encoding);
        }
        finally
        {
            close(in);
        }
    }
    
    public static byte[] readStreamToBytes(InputStream in) throws IOException
    {
        ByteArrayOutputStream out = null;
        byte[] buffer = new byte[1024 * 4];
        int n = 0;
        
        try
        {
            out = new ByteArrayOutputStream();
            while (-1 != (n = in.read(buffer)))
            {
                out.write(buffer, 0, n);
            }
            return out.toByteArray();
        }
        catch (IOException e)
        {
            throw e;
        }
        finally
        {
            close(out);
        }
    }
    
    public static String readStreamToString(InputStream in, String encoding) throws IOException
    {
        return new String(readStreamToBytes(in), encoding);
    }
    
    /**
     * Recursively delete a directory.
     * 
     * @param directory directory to delete
     * @throws IOException in case deletion is unsuccessful
     */
    public static void deleteDirectory(File directory) throws IOException
    {
        if (!directory.exists())
        {
            return;
        }
        
        cleanDirectory(directory);
        if (!directory.delete())
        {
            String message = "Unable to delete directory " + directory + ".";
            throw new IOException(message);
        }
    }
    
    /**
     * <p> Delete a file. If file is a directory, delete it and all
     * sub-directories. </p> <p> The difference between File.delete() and this
     * method are: </p> <ul> <li>A directory to be deleted does not have to be
     * empty.</li> <li>You get exceptions when a file or directory cannot be
     * deleted. (java.io.File methods returns a boolean)</li> </ul>
     * 
     * @param file file or directory to delete.
     * @throws IOException in case deletion is unsuccessful
     */
    public static void forceDelete(File file) throws IOException
    {
        if (file.isDirectory())
        {
            deleteDirectory(file);
        }
        else
        {
            if (!file.exists())
            {
                throw new FileNotFoundException("File does not exist: " + file);
            }
            if (!file.delete())
            {
                String message = "Unable to delete file: " + file;
                throw new IOException(message);
            }
        }
    }
    
    /**
     * Clean a directory without deleting it.
     * 
     * @param directory directory to clean
     * @throws IOException in case cleaning is unsuccessful
     */
    public static void cleanDirectory(File directory) throws IOException
    {
        if (!directory.exists())
        {
            String message = directory + " does not exist";
            throw new IllegalArgumentException(message);
        }
        
        if (!directory.isDirectory())
        {
            String message = directory + " is not a directory";
            throw new IllegalArgumentException(message);
        }
        
        IOException exception = null;
        
        File[] files = directory.listFiles();
        for (File file : files)
        {
            try
            {
                forceDelete(file);
            }
            catch (IOException ioe)
            {
                exception = ioe;
            }
        }
        
        if (null != exception)
        {
            throw exception;
        }
    }
    
    /**
     * Copy file from source to destination. The directories up to
     * <code>destination</code> will be created if they don't already exist.
     * <code>destination</code> will be overwritten if it already exists. The
     * copy will have the same file date as the original.
     * 
     * @param source An existing non-directory <code>File</code> to copy bytes
     *            from.
     * @param destination A non-directory <code>File</code> to write bytes to
     *            (possibly overwriting).
     * @throws IOException if <code>source</code> does not exist,
     *             <code>destination</code> cannot be written to, or an IO error
     *             occurs during copying.
     * @throws FileNotFoundException if <code>destination</code> is a directory
     *             (use {@link #copyFileToDirectory}).
     */
    public static void copyFile(File source, File destination) throws IOException
    {
        copyFile(source, destination, true);
    }
    
    /**
     * Copy file from source to destination. The directories up to
     * <code>destination</code> will be created if they don't already exist.
     * <code>destination</code> will be overwritten if it already exists.
     * 
     * @param source An existing non-directory <code>File</code> to copy bytes
     *            from.
     * @param destination A non-directory <code>File</code> to write bytes to
     *            (possibly overwriting).
     * @param preserveFileDate True if the file date of the copy should be the
     *            same as the original.
     * @throws IOException if <code>source</code> does not exist,
     *             <code>destination</code> cannot be written to, or an IO error
     *             occurs during copying.
     * @throws FileNotFoundException if <code>destination</code> is a directory
     *             (use {@link #copyFileToDirectory}).
     */
    public static void copyFile(File source, File destination, boolean preserveFileDate) throws IOException
    {
        // check source exists
        if (!source.exists())
        {
            String message = "File " + source + " does not exist";
            throw new FileNotFoundException(message);
        }
        
        // does destinations directory exist ?
        if ((destination.getParentFile() != null) && !destination.getParentFile().exists())
        {
            destination.getParentFile().mkdirs();
        }
        
        // make sure we can write to destination
        if (destination.exists() && !destination.canWrite())
        {
            String message = "Unable to open file " + destination + " for writing.";
            throw new IOException(message);
        }
        
        // makes sure it is not the same file
        if (source.getCanonicalPath().equals(destination.getCanonicalPath()))
        {
            String message = "Unable to write file " + source + " on itself.";
            throw new IOException(message);
        }
        
        FileInputStream input = null;
        FileOutputStream output = null;
        byte[] buffer = new byte[1024 * 4];
        int n = 0;
        
        try
        {
            input = new FileInputStream(source);
            output = new FileOutputStream(destination);
            while (-1 != (n = input.read(buffer)))
            {
                output.write(buffer, 0, n);
            }
        }
        finally
        {
            close(output);
            close(input);
        }
        
        if (source.length() != destination.length())
        {
            String message = "Failed to copy full contents from " + source + " to " + destination;
            throw new IOException(message);
        }
        
        if (preserveFileDate)
        {
            // file copy should preserve file date
            destination.setLastModified(source.lastModified());
        }
    }
    
    /**
     * Copy file from source to destination. If
     * <code>destinationDirectory</code> does not exist, it (and any parent
     * directories) will be created. If a file <code>source</code> in
     * <code>destinationDirectory</code> exists, it will be overwritten. The
     * copy will have the same file date as the original.
     * 
     * @param source An existing <code>File</code> to copy.
     * @param destinationDirectory A directory to copy <code>source</code> into.
     * @throws FileNotFoundException if <code>source</code> isn't a normal file.
     * @throws IllegalArgumentException if <code>destinationDirectory</code>
     *             isn't a directory.
     * @throws IOException if <code>source</code> does not exist, the file in
     *             <code>destinationDirectory</code> cannot be written to, or an
     *             IO error occurs during copying.
     */
    public static void copyFileToDirectory(File source, File destinationDirectory) throws IOException
    {
        if (destinationDirectory.exists() && !destinationDirectory.isDirectory())
        {
            throw new IllegalArgumentException("Destination is not a directory");
        }
        
        copyFile(source, new File(destinationDirectory, source.getName()), true);
    }
    
    public static byte[] readFileToBytes(File file) throws IOException
    {
        
        InputStream in = new FileInputStream(file);
        try
        {
            return readStreamToBytes(in);
        }
        finally
        {
            close(in);
        }
        
    }
    
    public static File getUserDir()
    {
        return new File(System.getProperty("user.dir"));
    }
    
    public static File getUserDirFile(String subName)
    {
        return new File(getUserDir(), subName);
    }
    
    public static File getUserHome()
    {
        return new File(System.getProperty("user.home"));
    }
    
    public static File getUserHomeFile(String subName)
    {
        return new File(getUserHome(), subName);
    }
    
    public static File getTmpDir()
    {
        return new File(System.getProperty("java.io.tmpdir"));
    }
    
    public static File getTmpDir(String subName)
    {
        return new File(getTmpDir(), subName);
    }
    
    public static boolean copyResourceToFile(String resName, File destFile) throws IOException
    {
        InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(resName);
        if (in != null)
        {
            try
            {
                destFile.getParentFile().mkdirs();
                writeStreamToFile(destFile, in);
                return true;
            }
            finally
            {
                close(in);
            }
        }
        return false;
    }
    
    public static boolean createNewFileIfNotExists(File file)
    {
        if (file == null)
        {
            return false;
        }
        
        if (file.exists())
        {
            return false;
        }
        
        if (!file.getParentFile().exists())
        {
            file.getParentFile().mkdirs();
        }
        
        boolean ret = false;
        try
        {
            ret = file.createNewFile();
        }
        catch (IOException e)
        {
            LOG.error(e.toString(), e);
            return false;
        }
        
        return ret;
    }
}
