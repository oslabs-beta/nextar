import { LoggerConfig } from './types';
export declare function loadDefaultConfig(): {
    forceFlushTimeoutMillis: number;
    logRecordLimits: {
        attributeValueLengthLimit: number;
        attributeCountLimit: number;
    };
    includeTraceContext: boolean;
};
/**
 * When general limits are provided and model specific limits are not,
 * configures the model specific limits by using the values from the general ones.
 * @param userConfig User provided tracer configuration
 */
export declare function reconfigureLimits(userConfig: LoggerConfig): LoggerConfig;
/**
 * Function to merge Default configuration (as specified in './config') with
 * user provided configurations.
 */
export declare function mergeConfig(userConfig: LoggerConfig): Required<LoggerConfig>;
export declare const DEFAULT_EVENT_DOMAIN = "default";
//# sourceMappingURL=config.d.ts.map