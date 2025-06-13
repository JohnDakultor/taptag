export default function SignupNow({message = "Sign up now to get started"}: {message?: string}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-yellow-400 font-medium mt-2">{message}</p>
        </div>
    );
}