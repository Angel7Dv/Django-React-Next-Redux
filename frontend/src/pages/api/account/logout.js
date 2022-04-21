import cookie from 'cookie'


// rute: http://localhost:3000/api/account/logout


// no accedemos al backend solo eliminamos el tiempo de vida de la cookie para el header que contiene el token
export default async (request, response) => {
    if (request.method === 'POST') {
        response.setHeader('Set-Cookie', [
            cookie.serialize('access', "", {
                httpOnly: true,
                secure: process.env.ENV_DEV !== 'false',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/api/'
            }),


            cookie.serialize('access', "",{
                httpOnly: true,
                secure: process.env.ENV_DEV !== 'false',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/api/'
            })
        ])

        return response.status(200).json({ success: 'Lout success' })

    } else {
        response.setHeader('Allow', ['POST'])
        return response.status(200).json({ 'error': 'only alow POST method' })
    }
}