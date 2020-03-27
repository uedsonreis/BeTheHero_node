import env from './env'
import app from '.'

app.listen(
    env.portServer,
    () => console.log("Serviço rodando na porta %s!", env.portServer)
)