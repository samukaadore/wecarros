import logoImg from '../../img/logo.svg'
import { Container } from '../../components/container'
import { useEffect, useContext } from 'react'
import { Input } from '../../components/input'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { MdPassword } from 'react-icons/md'
import toast from 'react-hot-toast'


import {auth} from '../../services/firebaseConection'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { AuthContext } from '../../contexts/AuthContext'

const schema = z.object({
   name: z.string().nonempty("O campo é obrigatorio"),
   email: z.string().email("Insira um email valido").nonempty("O campo é obrigatorio"),
   password: z.string().min(6,"A senha deve ter no minimo 6 caracteres").nonempty("O campo é obrigatorio")

})

type FormData = z.infer<typeof schema>


export function Register(){
   const {handleInfoUser} = useContext(AuthContext);
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

   async function onSubmit(data: FormData){
      createUserWithEmailAndPassword(auth, data.email, data.password)



      .then(async (user) => {
         await updateProfile(user.user,{
            displayName: data.name
         })

         handleInfoUser({
            name: data.name,
            email: data.email,
            uid: user.user.uid
         })

         console.log("cadastrado com suecesso")
         toast.success("Cadastrado com sucesso")
         navigate("/dashboard", {replace: true})

      })
      .catch((error) => {
         console.log("erro ao cadastrar este usuario")
         console.log(error);
         toast.error("Erro ao cadastrar ")
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
                    placeholder="Digite seu nome completo..."
                    type="text"
                    name="name"
                    error={errors.name?.message}
                    register={register}
                  />
               </div>



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
                type="submit" 
                className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium cursor-pointer'>
                  Cadastrar
                </button>
            </form>

            <Link to="/login">
              ja possui uma conta? Faça o login!


            </Link>

          </div>
       </Container>
    )
}