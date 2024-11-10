'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://ai-mock-interview-server.onrender.com/graphql"
})
export default function Provider({ children }) {
    return (
        <ClerkProvider>
            <ApolloProvider client={client}>
                <Toaster />
                {children}
            </ApolloProvider>
        </ClerkProvider>
    )
}
