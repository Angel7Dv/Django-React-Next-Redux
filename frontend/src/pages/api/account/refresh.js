import cookie from 'cookie'

const backend_api = process.env.BACKEND_DJANGO_API

// CUANDO EXPIRA EL refresh TOKEN RELOGEAMOS POR MEDIO DE REFRESH TOKEN

export default async (request, response) => {
    // const cookies = request.headers.cookie //cookie.parse(request.headers.cookie)

    if (request.method === 'GET') {
        const cookies = cookie.parse(request.headers.cookie ?? '') // realiza un llamado al headers donde guardamos las cookies de login
        const refresh = cookies.refresh
        const body = JSON.stringify({ refresh })


        if (!refresh) { // if no login
            return response.status(404).json({ error: "user no loged", debug: cookies.refresh })
        } else { // estamos logeados
            try {
                // serializer de usuarios
                const resApi = await fetch(`${backend_api}token/refresh/`, {
                    method: 'POST', // para enviar el refresh token
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${cookies.refresh}`,
                    },
                    body: body
                })
                const data = await resApi.json()
                if (resApi.status === 200) {
                    response.setHeader('Set-Cookie', [ // agrega un header a la respuesta de la peticion
                        // datos serializados por medio de la cookie que seran agregados al header del response
                        cookie.serialize('access', data.access, {
                            httpOnly: true,
                            secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                            maxAge: 1800, // 60*30 coincide con el SIMPLE_JWT = {'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30), del backend
                            sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                            path: '/api/'
                        }),
                        // apicamos lo mismo para el refresh token que nos dara el login
                        cookie.serialize('refresh', data.refresh, {
                            httpOnly: true,
                            secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                            maxAge: 60 * 60 * 24, // 60*30 coincide con el SIMPLE_JWT = {'REFRESH_TOKEN_LIFETIME': timedelta(days=1), del backend
                            sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                            path: '/api/'
                        })
                    ])
                    // console.log(refresh)
                    // console.log(cookies.refresh)
                    return response.status(200).json({ success: "token access revify", data: cookies })
                } else {
                    return response.status(500).json({ error: "token expired" })

                }

            } catch (error) {
                return response.status(500).json({ error: "error de backend api" })
            }
        }
    } else {
        return response.status(500).json({ error: "Method no allow" })
    }


}