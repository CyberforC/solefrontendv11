import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Label from '@/components/Label'
import PreviousLink from '@/components/PreviousLink'
import Select from '@/components/Select'
import Star from '@/components/Star'
import NotStar from '@/components/NotStar'
import { ratingAPI } from '@/hooks/rating'
import { useAuth } from '@/hooks/auth'

import { FaStar } from 'react-icons/fa'

const Create = () => {

    const { createAuthor, editAuthor } = ratingAPI()
    const { user } = useAuth({middleware: 'auth'})
    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [author_id, setAuthorId] = useState('')
    const [full_name, setFullName] = useState('')
    //const [stars, setStars] = useState(1)
    const [stars, setStars] = useState(0)
    const [rating_id, setRating] = useState('')
    const [user_id, setUserId] = useState('')
    //const [user_id, setUserId] = useState(user.id)
    //const [selectedStarCount, setSelectedStarCount] = useState(0)

    /* Constantes y funciones para la nueva calificación */
    //const [rating, setRating1] = useState(0)
    const [hover, setHover] = useState(0)
    //const [comment, setComment] = useState('')

    /*const handleSubmitRating = (e) => {
        e.preventDefault();
        console.log('Rating:', rating)
    }*/

    const starChose = (val) => {
        setStars(val)
    }

    const submitForm = event => {
        event.preventDefault()
        if (!rating_id) {
            createAuthor({ number_star: stars, author: { id: author_id }, user: { id: user_id }, setErrors })
        }
        else {
            editAuthor({ number_star: stars, author: { id: author_id }, user : { id: user_id }, setErrors }, rating_id)
        }
    }

    function changeState(val) {
        alert('Cambiando la calificación' + val)
        //console.log(val)
    }

    function numerStar(index) {
        console.log('Número de estrella ' + index)
    }

    useEffect(() => {
        if (router.isReady) {
            setUserId(user.id)
            axios
                .get(`/api/authors/${router.query.id}/ratings`)
                .then(res => {
                    setFullName(res.data.author.full_name)
                    setAuthorId(res.data.author.id)
                    if (res.data.rating != '') {
                        setStars(parseInt(res.data.rating[0].number_star))
                        setRating(res.data.rating[0].id)
                    }
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error
                })
        }
    }, [router.isReady])
    //}, [router.query.id])

    return (
        <AppLayout 
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Puntuar Autor: { full_name }
                </h2>
            }>
            <Head>
                <title>Laravel - Authors - Ratings</title>
            </Head>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Puntuación</h2>
                    <form onSubmit={submitForm}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                            Calificación por estrellas
                            </label>
                            <div className="flex items-center">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                <label key={index}>
                                    <input
                                    type="radio"
                                    name="rating"
                                    className="hidden"
                                    value={stars}
                                    onClick={() => starChose(ratingValue)}
                                    />
                                    <FaStar
                                    className="cursor-pointer transition-colors duration-200"
                                    color={ratingValue <= (hover || stars) ? "#ffc107" : "#e4e5e9"}
                                    size={30}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                                );
                            })}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            type="submit"
                            >
                            Puntuar Autor
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-end">
                        <PreviousLink href="/authors"></PreviousLink>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Create
