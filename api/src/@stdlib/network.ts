/**
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2024-2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export const HttpCodes = {
    Continue: 100,
    'Switching Protocols': 101,
    Processing: 102,
    'Early Hints': 103,
    OK: 200,
    Created: 201,
    Accepted: 202,
    'Non-Authoritative Information': 203,
    'No Content': 204,
    'Reset Content': 205,
    'Partial Content': 206,
    'Multi-Status': 207,
    'Already Reported': 208,
    'This is fine': 218,
    'IM Used': 226,
    'Multiple Choices': 300,
    'Moved Permanently': 301,
    Found: 302,
    'See Other': 303,
    'Not Modified': 304,
    'Use Proxy': 305,
    '(Unused)': 306,
    'Temporary Redirect': 307,
    'Permanent Redirect': 308,
    'Bad Request': 400,
    Unauthorized: 401,
    'Payment Required': 402,
    Forbidden: 403,
    'Not Found': 404,
    'Method Not Allowed': 405,
    'Not Acceptable': 406,
    'Proxy Authentication Required': 407,
    'Request Timeout': 408,
    Conflict: 409,
    Gone: 410,
    'Length Required': 411,
    'Precondition Failed': 412,
    'Payload Too Large': 413,
    'URI Too Long': 414,
    'Unsupported Media Type': 415,
    'Range Not Satisfiable': 416,
    'Expectation Failed': 417,
    'Authentication Required': 418,
    'Page Expired': 419,
    'Method Failure': 420,
    'Misdirected Request': 421,
    'Unprocessable Entity': 422,
    Locked: 423,
    'Failed Dependency': 424,
    'Too Early': 425,
    'Upgrade Required': 426,
    'Precondition Required': 428,
    'Too Many Requests': 429,
    'Request Header Fields Too Large': 431,
    'Login Time-out': 440,
    'Retry With': 449,
    'Unavailable For Legal Reasons': 451,
    'Invalid Token': 498,
    'Token Required': 499,
    'Internal Server Error': 500,
    'Not Implemented': 501,
    'Bad Gateway': 502,
    'Service Unavailable': 503,
    'Gateway Timeout': 504,
    'HTTP Version Not Supported': 505,
    'Variant Also Negotiates': 506,
    'Insufficient Storage': 507,
    'Loop Detected': 508,
    'Bandwidth Limit Exceeded': 509,
    'Not Extended': 510,
    'Network Authentication Required': 511,
} as const

export type HttpCodesDescription = keyof typeof HttpCodes
export type HttpCodes = (typeof HttpCodes)[HttpCodesDescription]
export type HttpCodesDescriptions = Record<HttpCodes, HttpCodesDescription>

export const HttpCodesDescriptions = Object.fromEntries(
    Object.entries(HttpCodes).map(([desc, code]) => [code, desc]),
) as HttpCodesDescriptions

export const HttpError = (code: HttpCodes): HttpCodesDescription =>
    HttpCodesDescriptions[code] ?? 'Unknown'
