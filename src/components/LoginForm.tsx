import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom'

import { Button } from 'primereact/button'
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

const LoginForm = observer(() => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/")
    }
  }, [auth.isAuthenticated, navigate])

  const handleLogin = async () => {
    await auth.login(email, password)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1>Login</h1>
      </div>

      <div style={{marginTop: '1em'}}>
        <InputText placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      </div>
      
      <div style={{marginTop: '1em'}}>
        <Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} onKeyUp={(e) => {if(e.key === 'Enter'){handleLogin()}}} />
      </div>

      { auth.loginError && 
        <div style={{marginTop: '1em'}}>
          <Message severity="error" text={auth.loginError} />
        </div>
      }

      <div style={{marginTop: '1em'}}>
        <Button style={{backgroundColor: 'var(--primary-color)'}} label="Login" onClick={handleLogin} disabled={auth.loginWait} loading={auth.loginWait} />  
      </div>
    </div>
  )
})

export default LoginForm
