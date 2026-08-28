const API_URL = "http://localhost:5000/api";

interface RequestOptions extends RequestInit {
    token?: string;
}

async function request<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { token, ...fetchOptions } = options;

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...fetchOptions,
            headers: {
                "Content-Type": "application/json",
                ...(token
                    ? {
                        Authorization: `Bearer ${token}`,
                    }
                    : {}),
                ...fetchOptions.headers,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong."
        );
    }

    return data;
}

export const api = {
    get<T>(
        endpoint: string,
        token?: string
    ) {
        return request<T>(
            endpoint,
            {
                method: "GET",
                token,
            }
        );
    },

    post<T>(
        endpoint: string,
        body: unknown,
        token?: string
    ) {
        return request<T>(
            endpoint,
            {
                method: "POST",
                body: JSON.stringify(body),
                token,
            }
        );
    },

    put<T>(
        endpoint: string,
        body: unknown,
        token?: string
    ) {
        return request<T>(
            endpoint,
            {
                method: "PUT",
                body: JSON.stringify(body),
                token,
            }
        );
    },

    patch<T>(
        endpoint: string,
        body: unknown,
        token?: string
    ) {
        return request<T>(
            endpoint,
            {
                method: "PATCH",
                body: JSON.stringify(body),
                token,
            }
        );
    },

    delete<T>(
        endpoint: string,
        token?: string
    ) {
        return request<T>(
            endpoint,
            {
                method: "DELETE",
                token,
            }
        );
    },
};