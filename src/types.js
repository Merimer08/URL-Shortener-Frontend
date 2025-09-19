/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {object} AuthResponse
 * @property {User} user
 * @property {string} token
 */

/**
 * @typedef {object} ShortLink
 * @property {string} id
 * @property {string} short_code
 * @property {string} original_url
 * @property {number} clicks_count
 * @property {number | null} max_clicks
 * @property {string | null} expires_at
 * @property {string | null} notes
 * @property {string | null} deleted_at
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {object} LinkClick
 * @property {string} id
 * @property {string} short_link_id
 * @property {string} clicked_at
 * @property {string} ip
 * @property {string} user_agent
 * @property {string | null} referer
 * @property {string | null} country
 * @property {string | null} browser
 * @property {string | null} device
 */

/**
 * @typedef {object} DailyClick
 * @property {string} d - The date.
 * @property {number} c - The count of clicks.
 */

/**
 * @typedef {object} SourceStat
 * @property {string} name
 * @property {number} c - The count.
 */

/**
 * @typedef {object} Stats
 * @property {number} total
 * @property {DailyClick[]} last7
 * @property {SourceStat[]} browsers
 * @property {SourceStat[]} countries
 * @property {ShortLink} link
 */

/**
 * @template T
 * @typedef {object} PaginatedResponse
 * @property {T[]} data
 * @property {number} current_page
 * @property {number} last_page
 * @property {number} per_page
 * @property {number} total
 */

/**
 * @typedef {object} ToastMessage
 * @property {number} id
 * @property {string} message
 * @property {'success' | 'error'} type
 */

/**
 * @typedef {object} ApiError
 * @property {string} message
 * @property {Record<string, string[]>} [errors]
 */

export {};
