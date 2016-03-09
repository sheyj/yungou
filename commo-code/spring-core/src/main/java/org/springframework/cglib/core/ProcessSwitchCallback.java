package org.springframework.cglib.core;

import org.springframework.asm.Label;

public interface ProcessSwitchCallback {
    void processCase(int key, Label end) throws Exception;
    void processDefault() throws Exception;
}
