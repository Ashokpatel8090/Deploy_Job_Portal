import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UI/UX Designer",
    "Cybersecurity Analyst",
    "DevOps Engineer",
    "Product Manager",
    "Cloud Architect",
    "Mobile App Developer",
    "SEO Specialist",
    "Blockchain Developer",
    "AI/ML Engineer",
    "Tech Support Specialist"
];

const CategoryCarousel = (query) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

     const searchJobHandler = () => {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }

    return (
        <div className="py-10 ">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#6A38C2]">Explore Job Categories</h2>
            <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent className="flex gap-4">
                    {categories.map((data, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                            <Button
                                onClick={() => searchJobHandler(data)}
                                variant="outline"
                                className="rounded-full px-6 py-3 bg-white shadow-md hover:bg-[#6A38C2] hover:text-white transition-all">
                                {data}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
