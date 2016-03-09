package org.springframework.cglib.core;

/**
 * The default policy used by {@link AbstractClassGenerator}.
 * Generates names such as
 * <p><code>net.sf.cglib.Foo$$EnhancerByCGLIB$$38272841</code><p>
 * This is composed of a prefix based on the name of the superclass, a fixed
 * string incorporating the CGLIB class responsible for generation, and a
 * hashcode derived from the parameters used to create the object. If the same
 * name has been previously been used in the same <code>ClassLoader</code>, a
 * suffix is added to ensure uniqueness.
 */
public class DefaultNamingPolicy implements NamingPolicy {
    public static final DefaultNamingPolicy INSTANCE = new DefaultNamingPolicy();
    
    public String getClassName(String prefix, String source, Object key, Predicate names) {
        if (prefix == null) {
            prefix = "net.sf.cglib.empty.Object";
        } else if (prefix.startsWith("java")) {
            prefix = "$" + prefix;
        }
        String base =
            prefix + "$$" + 
            source.substring(source.lastIndexOf('.') + 1) +
            getTag() + "$$" +
            Integer.toHexString(key.hashCode());
        String attempt = base;
        int index = 2;
        while (names.evaluate(attempt))
            attempt = base + "_" + index++;
        return attempt;
    }

    /**
     * Returns a string which is incorporated into every generated class name.
     * By default returns "ByCGLIB"
     */
    protected String getTag() {
        return "ByCGLIB";
    }

  public int hashCode() {
    return getTag().hashCode();
  }

  public boolean equals(Object o) {
    return (o instanceof DefaultNamingPolicy) && ((DefaultNamingPolicy) o).getTag().equals(getTag());
  }
}
