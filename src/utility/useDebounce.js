import _ from "lodash"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMounted } from 'usehooks-ts'

export default function useDebounce(cb, delay) {
  const options = {
    leading: false,
    trailing: true
  };
  const inputsRef = useRef(cb);
  const isMounted = useIsMounted();
  useEffect(() => {
    inputsRef.current = { cb, delay };
  });
  // ...
  // const inputsRef = useRef({cb, delay}); // mutable ref like with useThrottle
  // useEffect(() => { inputsRef.current = { cb, delay }; }); //also track cur. delay
  return useCallback(
    _.debounce((...args) => {
        // Debounce is an async callback. Cancel it, if in the meanwhile
        // (1) component has been unmounted (see isMounted in snippet)
        // (2) delay has changed
        if (inputsRef.current.delay === delay && isMounted())
          inputsRef.current.cb(...args);
      }, delay, options
    ),
    [delay, _.debounce]
  );
}