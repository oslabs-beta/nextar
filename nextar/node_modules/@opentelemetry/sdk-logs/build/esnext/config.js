/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DEFAULT_ATTRIBUTE_COUNT_LIMIT, DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT, getEnv, getEnvWithoutDefaults, } from '@opentelemetry/core';
export function loadDefaultConfig() {
    return {
        forceFlushTimeoutMillis: 30000,
        logRecordLimits: {
            attributeValueLengthLimit: getEnv().OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: getEnv().OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT,
        },
        includeTraceContext: true,
    };
}
/**
 * When general limits are provided and model specific limits are not,
 * configures the model specific limits by using the values from the general ones.
 * @param userConfig User provided tracer configuration
 */
export function reconfigureLimits(userConfig) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const logRecordLimits = Object.assign({}, userConfig.logRecordLimits);
    const parsedEnvConfig = getEnvWithoutDefaults();
    /**
     * Reassign log record attribute count limit to use first non null value defined by user or use default value
     */
    logRecordLimits.attributeCountLimit =
        (_d = (_c = (_b = (_a = userConfig.logRecordLimits) === null || _a === void 0 ? void 0 : _a.attributeCountLimit) !== null && _b !== void 0 ? _b : parsedEnvConfig.OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT) !== null && _c !== void 0 ? _c : parsedEnvConfig.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && _d !== void 0 ? _d : DEFAULT_ATTRIBUTE_COUNT_LIMIT;
    /**
     * Reassign log record attribute value length limit to use first non null value defined by user or use default value
     */
    logRecordLimits.attributeValueLengthLimit =
        (_h = (_g = (_f = (_e = userConfig.logRecordLimits) === null || _e === void 0 ? void 0 : _e.attributeValueLengthLimit) !== null && _f !== void 0 ? _f : parsedEnvConfig.OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _g !== void 0 ? _g : parsedEnvConfig.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _h !== void 0 ? _h : DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
    return Object.assign({}, userConfig, { logRecordLimits });
}
/**
 * Function to merge Default configuration (as specified in './config') with
 * user provided configurations.
 */
export function mergeConfig(userConfig) {
    const DEFAULT_CONFIG = loadDefaultConfig();
    const target = Object.assign({}, DEFAULT_CONFIG, userConfig);
    target.logRecordLimits = Object.assign({}, DEFAULT_CONFIG.logRecordLimits, userConfig.logRecordLimits || {});
    return target;
}
export const DEFAULT_EVENT_DOMAIN = 'default';
//# sourceMappingURL=config.js.map