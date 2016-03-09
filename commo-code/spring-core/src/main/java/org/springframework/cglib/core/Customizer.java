package org.springframework.cglib.core;

import org.springframework.asm.Type;

public interface Customizer {
    void customize(CodeEmitter e, Type type);
}
