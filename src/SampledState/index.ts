/**
 * The sampling state of the TraceContext. This flag tells the 
 * Tracing system whether the current TraceContext should be 
 * captured in the tracing system.
 *
 * Visit the following link for information about SampleState:
 * https://github.com/openzipkin/b3-propagation#sampling-state
 */

export enum ESampledState {
    ACCEPT,
    DENY,
    DEBUG,
    DEFER,
}

/**
 * Converts a given string into its respective ESampledState enum.
 * 
 * @param state
 * The string value to convert to its respective ESampledState enumeration.
 * @returns the provided `state` string as an ESampledState enum.
 */
export function toEnum(state?: string) : ESampledState {
    if (state === "true" || state === "1") {
        return ESampledState.ACCEPT;
    }
    if (state === "false" || state === "0") {
        return ESampledState.DENY;
    }
    if (state === "d") {
        return ESampledState.DEBUG;
    }
    // Treat undefined and invalid values as "defer"
    return ESampledState.DEFER;
}

/**
 * Converts a given ESampledState enum into its respective string.
 * 
 * @param sampling
 * The ESampledState enum to convert to its respective string value.
 * @returns the provided `sampling` ESampledState enum as a string.
 */
export function toString(sampling: ESampledState) : string {
    switch (sampling) {
        case ESampledState.ACCEPT:
            return "1";
        case ESampledState.DENY:
            return "0";
        case ESampledState.DEBUG:
            return "d";
        default:
            return null;
    }
}
