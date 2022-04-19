//http://127.0.0.1:8000/api/account/register/ backend register post


//http://localhost:3000/api/account/register

const backend_api = process.env.BACKEND_DJANGO_API
export default async (request, response) => {

    if (request.method === 'POST') {
        //destructuring data
        const { first_name, last_name, username, password, re_password } = request.body
        const post_body = JSON.stringify(first_name, last_name, username, password, re_password)
        try {
            const apiRes = await fetch(`${backend_api}account/register/`, {
                method: "POST",
                headers: {
                    "Accept": "appliacation/json",
                    "Content-Type": "appliacation/json"
                },
                body: post_body
            });
            const data = await apiRes.json()
            if (apiRes.status === 201) {
                return response.status(201).json({ success: data.success })

            } else {
                return response.status(apiRes.status).json({ error: data.error })
            }
        } catch (error) {
            return response.status(501).json({ error: "any error" })
        }
    } else {
        response.setHeader('Allow', ['POST']); // need post method
        return response.status(405).json({ erro: `Method ${request.method} not allowed` })
    }
}