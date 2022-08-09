import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "../../API/fetcher"

const DogCard = ({selected}) => {
  const { data, error, isValidating } = useSWR('https://dog.ceo/api/breeds/image/random', fetcher)
  const { mutate } = useSWRConfig()
  const [dog, setDog] = useState(null)

  const handleClick = () => {
    mutate('https://dog.ceo/api/breeds/image/random')
  }
  useEffect(() => {
    setDog(data)
  }, [data])

  const byBreed = useCallback(async () => {
    let data = await fetcher(`https://dog.ceo/api/breed/${selected}/images`)
    setDog(data[0])
  }, [selected])

  useEffect(() => {
   byBreed()
  }, [byBreed])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (

    <div className="flex flex-col w-[400px] justify-between items-center text-white space-y-4 rounded-sm overflow-hidden">
      <div className="flex rounded-md overflow-hidden">
        <Image src={dog} alt='random dog' width={400} height={400} layout="fixed" objectFit="cover" className={`${isValidating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out shadow-md`} />
      </div>
      <div className="flex w-full justify-center items-center">
        <button className="btn btn-primary" onClick={handleClick} >Get Random Dog</button>
      </div>
    </div>
  )
}

export default DogCard