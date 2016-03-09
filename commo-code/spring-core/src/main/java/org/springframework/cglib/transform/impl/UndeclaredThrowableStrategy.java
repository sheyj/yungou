package org.springframework.cglib.transform.impl;

import org.springframework.cglib.core.ClassGenerator;
import org.springframework.cglib.core.DefaultGeneratorStrategy;
import org.springframework.cglib.core.TypeUtils;
import org.springframework.cglib.transform.ClassTransformer;
import org.springframework.cglib.transform.MethodFilter;
import org.springframework.cglib.transform.MethodFilterTransformer;
import org.springframework.cglib.transform.TransformingClassGenerator;

/**
 * A {@link GeneratorStrategy} suitable for use with {@link net.sf.cglib.Enhancer} which
 * causes all undeclared exceptions thrown from within a proxied method to be wrapped
 * in an alternative exception of your choice.
 */
public class UndeclaredThrowableStrategy extends DefaultGeneratorStrategy {
    

    private Class wrapper;

	/**
     * Create a new instance of this strategy.
     * @param wrapper a class which extends either directly or
     * indirectly from <code>Throwable</code> and which has at least one
     * constructor that takes a single argument of type
     * <code>Throwable</code>, for example
     * <code>java.lang.reflect.UndeclaredThrowableException.class</code>
     */
    public UndeclaredThrowableStrategy(Class wrapper) {
       this.wrapper = wrapper;
    }
    
    private static final MethodFilter TRANSFORM_FILTER = new MethodFilter() {
        public boolean accept(int access, String name, String desc, String signature, String[] exceptions) {
            return !TypeUtils.isPrivate(access) && name.indexOf('$') < 0;
        }
    };

    protected ClassGenerator transform(ClassGenerator cg) throws Exception {
    	 ClassTransformer   tr = new UndeclaredThrowableTransformer(wrapper);
         tr = new MethodFilterTransformer(TRANSFORM_FILTER, tr);
        return new TransformingClassGenerator(cg, tr);
    }
}
