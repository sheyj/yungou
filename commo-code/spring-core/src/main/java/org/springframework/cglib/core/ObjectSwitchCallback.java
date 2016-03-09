package org.springframework.cglib.core;

import org.springframework.asm.Label;

public interface ObjectSwitchCallback {
    void processCase(Object key, Label end) throws Exception;
    void processDefault() throws Exception;
}
