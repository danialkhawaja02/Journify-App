import CallToActionSect from "../components/SectionComponents/CallToActionSect"
import CardBoxSect from "../components/SectionComponents/CardBoxSect"
import Container from "../components/SectionComponents/Container"
import HeroSect from "../components/SectionComponents/HeroSect"
import JournalsSect from "../components/SectionComponents/JournalsSect"

const cardContent = [
    {
        title: "Mental Well-being",
        content: "Journaling is more than writing; it's a vital tool for mental health. It helps reduce stress, manage anxiety, and improve sleep, offering a space to uncover hidden emotions and gain clarity.",
        image: "../../assets/card1.svg"
      },
      {
        title: "Personal Growth",
        content: "Your journal is a partner in personal growth. It allows you to track your journey, celebrate achievements, and set goals. Reflect on experiences and envision your future to unlock your full potential.",
        image: "../../assets/card2.svg"
      },
      {
        title: "Creativity Unleashed",
        content: "Journaling is a blank canvas for creativity. It offers a space to explore new ideas, brainstorm solutions, and let your imagination flow, making it a powerful tool for writers, artists, and creative thinkers.",
        image: "../../assets/card3.svg"
      }
  ];
  


export default function Home() {
    return(
        <>
        <Container>
            <HeroSect/>
            <div className="flex justify-center my-14">
                <h2 className="text-[36px] lg:text-[56px] font-extrabold text-center w-full lg:w-6/12 leading-[1.2em]">An app where you'll find a peace of mind</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-10">
                {cardContent.map((item)=>
                    <CardBoxSect key={item.title} title={item.title} content={item.content} image={item.image} />
                )}
            </div>
            <JournalsSect/>
            <CallToActionSect/>
        </Container>
        </>
    )
}