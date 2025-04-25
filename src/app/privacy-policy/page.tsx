

"use client"
import dynamic from "next/dynamic"
import Head from "next/head"
import PrivacyPolicyContent from "./privacyPolicyContent"

const privacyPolicyContent = dynamic(() => import("./privacyPolicyContent"), {
        ssr:false,
        loading: () => <div>Loading...</div>

})


export default function Page(){
        return(
                <>
                <Head>
                        <title>Privacy Policy</title>
                </Head>
                <PrivacyPolicyContent />
                </>
        )
}