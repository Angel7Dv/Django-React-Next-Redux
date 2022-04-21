import cookie from 'cookie'

const backend_api = process.env.BACKEND_DJANGO_API

// CUANDO EXPIRA EL ACCESS TOKEN RELOGEAMOS POR MEDIO DE REFRESH TOKEN


export default async (request, response) => {
    // const cookies = request.headers.cookie //cookie.parse(request.headers.cookie)

    if (request.method === 'GET') {
        const cookies = cookie.parse(request.headers.cookie ?? '') // realiza un llamado al headers donde guardamos las cookies de login
        
        const access = cookie.access
        const body = JSON.stringify({access})

        if (!access) { // if no login
            return response.status(404).json({ error: "user no loged" })
        } else { // estamos logeados
            try {
                // serializer de usuarios
                const resApi = await fetch(`${backend_api}token/verify/`, {
                    method: 'POST', // para enviar el refresh token
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${cookies.access}`,
                    },
                    body: body
                })
                const data = await resApi.json()
                

                if (resApi.status === 200) {
                    return response.status(200).json({ success: "token refresh revify", data: data.success })
                } else {
                    return response.status(500).json({error: "token expired"})

                }

            } catch (error) {
                return response.status(500).json({ error: "error de backend api" })
            }
        }
    } else {
        return response.status(500).json({ error: "Method no allow" })
    }


}