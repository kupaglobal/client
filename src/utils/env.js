export const getEnv = (key, defaultValue = null) => {
    return process.env[`REACT_APP_${key}`] ? process.env[`REACT_APP_${key}`] : (
        defaultValue || null
    )
}