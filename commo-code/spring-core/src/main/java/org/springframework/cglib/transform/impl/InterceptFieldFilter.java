package org.springframework.cglib.transform.impl;

import org.springframework.asm.Type;

public interface InterceptFieldFilter {
    boolean acceptRead(Type owner, String name);
    boolean acceptWrite(Type owner, String name);
}
