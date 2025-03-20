import logoImg from '../../img/logo.svg'
import { useEffect } from 'react'
import { Container } from '../../components/container'
import { Input } from '../../components/input'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from '../../services/firebaseConection'

const schema = z.object({
   email: z.string().email("Insira um email valido").nonempty("O campo é obrigatorio"),
   password: z.string().nonempty("O campo é obrigatorio")

})

type FormData = z.infer<typeof schema>


export function Login(){
   const navigate = useNavigate();
   const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange"
   })

   useEffect(() => {
      async function handleLogout(){
         await signOut(auth)
      }
      handleLogout();
   }, [])

   function onSubmit(data: FormData){
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
         console.log("logado com sucesso!")
         toast.success("Logado com sucesso!")
         console.log(user)
         navigate("/dashboard", {replace: true})

      })
      .catch( err => {
         console.log("erro ao logar")
         console.log(err);
         toast.error("Erro ao fazer o login.")
      })

   }


    return(
       <Container>
          <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
            <Link className='mb-6 max-w-sm w-full' to="/">
               <img 
               className='w-full'
               src={logoImg} 
               alt="logo do site" />
            </Link>

            <form 
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white max-w-xl w-full rounded-lg p-4'>
               <div className='mb-3'>
                 <Input
                    placeholder="Digite seu email..."
                    type="email"
                    name="email"
                    error={errors.email?.message}
                    register={register}
                  />
               </div>
               <div className='mb-3'>
                 <Input
                    placeholder="Digite sua senha..."
                    type="password"
                    name="password"
                    error={errors.password?.message}
                    register={register}
                  />
               </div>

                <button
                type='submit' 
                className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium cursor-pointer'>
                  Acessar
                </button>
            </form>

            <Link to="/register">
              Não possui uma conta? Cadastre-se!


            </Link>

          </div>
       </Container>
    )
}