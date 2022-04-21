import cookie from 'cookie'

const backend_api = process.env.BACKEND_DJANGO_API

export default async (request, response) => {
    // const cookies = request.headers.cookie //cookie.parse(request.headers.cookie)

    if (request.method === 'GET') {
        const cookies = cookie.parse(request.headers.cookie ?? '') // realiza un llamado al headers donde guardamos las cookies de login
        if (!cookies.access) { // if no login
            return response.status(404).json({ error: "user no loged" })
        } else { // estamos logeados
            try {
                // serializer de usuarios
                const resApi = await fetch(`${backend_api}account/user/`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${cookies.access}`,
                    }
                })
                const data = await resApi.json()
                

                if (resApi.status === 200) {
                    return response.status(200).json({ success: data.success })
                } else {
                    return response.status(500).json([cookies.access])

                }

            } catch (error) {
                return response.status(500).json({ error: "error de backend api" })
            }
        }
    } else {
        return response.status(500).json({ error: "Method no allow" })
    }


}