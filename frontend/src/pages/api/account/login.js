import cookie from 'cookie'


// rute: http://localhost:3000/api/account/login

const backend_api = process.env.BACKEND_DJANGO_API

export default async (request, response) =>{

    if(request.method === 'POST'){
        // const {username, password} = request.body //data from form
        const body = JSON.stringify(request.body)
        try {
            const apiRes = await fetch(`${backend_api}token/`, { // backend 
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            })

            const data = await apiRes.json() // must return 'access', 'refresh'

            if(apiRes.status === 200){
                // agregamos el token access a nuestra cookie
                console.log(data)
                response.setHeader('Set-Cookie', [ // agrega un header a la respuesta de la peticion
                    
                // datos serializados por medio de la cookie que seran agregados al header del response
                    cookie.serialize('access', data.access, {
                        httpOnly: true,
                        secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                        maxAge : 1800, // 60*30 coincide con el SIMPLE_JWT = {'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30), del backend
                        sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                        path: '/api/'

                    }),

                    // apicamos lo mismo para el refresh token que nos dara el login
                    cookie.serialize('refresh', data.refresh, {
                        httpOnly: true,
                        secure: process.env.ENV_DEV !== 'true', // si ENV_DEV es 'true' devuelve false y agrega el protocolo ssp
                        maxAge : 60 * 60 * 24 , // 60*30 coincide con el SIMPLE_JWT = {'REFRESH_TOKEN_LIFETIME': timedelta(days=1), del backend
                        sameSite: 'strict', // requiere que sea del mismo sitio de solicitud
                        path: '/api/'


                    })
                ])

                return response.status(200).json({success: 'Login success'})
                
            }else{

                return response.status(404).json({'error': 'bad request no status 200'})
            }
            

        } catch (error) {
            return response.status(404).json({'error': 'data to backend is bad', 'error2' :error.data})
        }



    }else{
        response.setHeader('Allow', ['POST'])
        return response.status(200).json({'error': 'only alow POST method'})
    }
}