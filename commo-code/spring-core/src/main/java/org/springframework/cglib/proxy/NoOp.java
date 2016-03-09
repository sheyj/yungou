package org.springframework.cglib.proxy;

/**
 * Methods using this {@link Enhancer} callback will delegate directly to the
 * default (super) implementation in the base class.
 */
public interface NoOp extends Callback
{
    /**
     * A thread-safe singleton instance of the <code>NoOp</code> callback.
     */
    public static final NoOp INSTANCE = new NoOp() { };
}
