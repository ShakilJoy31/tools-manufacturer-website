import React from 'react';

const Banner = () => {
    return (
        <div>
            <div>
                    <div class="carousel w-full">
                        <div id="slide1" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://media.istockphoto.com/photos/hand-tools-picture-id487125438?k=20&m=487125438&s=612x612&w=0&h=nn48Th50FUrs6Q0o9gUWHd3WyPWStTtDCynnjsUUeSA=" class="w-full" alt=''/> /
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" class="btn btn-circle">❮</a>
                                    <a href="#slide2" class="btn btn-circle">❯</a>
                                </div>
                        </div>


                        <div id="slide2" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://i.insider.com/60f09647bb790e0018207d73?width=700" class="w-full" alt=''/> /
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide1" class="btn btn-circle">❮</a>
                                    <a href="#slide3" class="btn btn-circle">❯</a>
                                </div>
                        </div>
                        <div id="slide3" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://www.irishtimes.com/polopoly_fs/1.4280471.1592559077!/image/image.jpg_gen/derivatives/box_620_330/image.jpg" class="w-full" alt=''/> /
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide2" class="btn btn-circle">❮</a>
                                    <a href="#slide4" class="btn btn-circle">❯</a>
                                </div>
                        </div>
                        <div id="slide4" class="carousel-item relative w-full">
                            <img className='w-full h-4/5' src="https://thumbs.dreamstime.com/t/man-work-hacksaw-cut-metal-pipe-gripped-vice-workbench-table-garage-workshop-do-yourself-concept-hands-close-up-162142897.jpg" class="w-full" alt=''/> /
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