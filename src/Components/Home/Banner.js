import React from 'react';

const Banner = () => {
    
    return (
        <div>
            <div>
                    <div class="carousel w-full">
                        <div id="slide1" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://img.freepik.com/free-photo/concept-happy-labor-day-with-different-accessories-yellow_185193-33055.jpg?w=996" class="w-full" alt=''/> /
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" class="btn btn-circle">❮</a>
                                    <a href="#slide2" class="btn btn-circle">❯</a>
                                </div>
                        </div>


                        <div id="slide2" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://img.freepik.com/free-photo/3d-illustration-screwdriverratchet-wrench-hammer-pliers-screws-etc-handmade-various-working-tools-construction-construction-renovation-concept_116124-10328.jpg?w=996" class="w-full" alt=''/> /
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide1" class="btn btn-circle">❮</a>
                                    <a href="#slide3" class="btn btn-circle">❯</a>
                                </div>
                        </div>
                        <div id="slide3" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://as1.ftcdn.net/v2/jpg/02/17/36/24/1000_F_217362432_v3jW4iAxr15l7PrPfGb0ZwTYxH14wJ1i.jpg" class="w-full" alt=''/> /
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide2" class="btn btn-circle">❮</a>
                                    <a href="#slide4" class="btn btn-circle">❯</a>
                                </div>
                        </div>
                        <div id="slide4" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://img.freepik.com/free-photo/various-working-tools-construction-repair-screwdriver-level-electrical-tape-hammer-knife-scissors-wrench-etc-3d-illustration_116124-10357.jpg?w=996" class="w-full" alt=''/> /
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide3" class="btn btn-circle">❮</a>
                                    <a href="#slide1" class="btn btn-circle">❯</a>
                                </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Banner;