import { useState } from 'react';
import axios from 'axios';
import './Login.css';
function Login({ onClose, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? 'login' : 'register';

        try {
            const res = await axios.post(
                `http://localhost:5000/api/auth/${endpoint}`,
                { email, password }
            );

            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                alert('Login successful!');
                if (onLoginSuccess) onLoginSuccess();
            } else {
                alert('Registration successful! Please login.');
                setIsLogin(true);
                setPassword('');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='min-h-screen flex items-center justify-center
 bg-gradient-to-r from-yellow-500 to-white'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
                <h2 className='text-3xl font-bold mb-6'>
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                {error && (
                    <div className='bg-red-100 border border-red-400
 text-red-700 px-4 py-3 rounded mb-4'>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full p-3 mb-4 border rounded'
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className='w-full p-3 mb-4 border rounded'
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-yellow-600 hover:bg-yellow-700
 text-white font-semibold py-3 rounded'
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>

                <p className='mt-4 text-center'>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className='text-yellow-600 hover:underline font-semibold'
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}
export default Login;