const ADMIN_PROFILE = '2'

function isAdmin(profile) {
    return profile === ADMIN_PROFILE
}

module.exports = (request) => {
    const user = request.user
    if (!user) return false

    const profile = user.profile || '1'
    let originalUrl = request.originalUrl

    if (request.params.pagina)
        originalUrl = originalUrl.replace(`/${request.params.pagina}`,'')
    
    switch (originalUrl) {
        case '/': return true
        case '/index': return true
        case '/login': return true
        case '/signup': return true
        case '/reports': return isAdmin(profile)
        default: return false
    }
}