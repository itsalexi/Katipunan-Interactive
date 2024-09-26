'use client';
import { ReactLenis } from 'lenis/dist/lenis-react';
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from 'framer-motion';
import { SiSpacex } from 'react-icons/si';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useRef } from 'react';

export const Timeline = () => {
    return (
        <div className="bg-[#181414]">
            <ReactLenis
                root
                options={{
                    // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
                    lerp: 0.05,
                    //   infinite: true,
                    //   syncTouch: true,
                }}
            >
                <Hero />
                <Schedule />
            </ReactLenis>
        </div>
    );
};

const SECTION_HEIGHT = 2500;

const Hero = () => {
    return (
        <div
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full"
        >
            <CenterImage />

            <ParallaxImages />

            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
        </div>
    );
};

const CenterImage = () => {
    const { scrollY } = useScroll();

    const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
    const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    const backgroundSize = useTransform(
        scrollY,
        [0, SECTION_HEIGHT + 500],
        ['170%', '100%']
    );
    const opacity = useTransform(
        scrollY,
        [SECTION_HEIGHT, SECTION_HEIGHT + 500],
        [1, 0]
    );

    return (
        <motion.div
            className="sticky top-0 h-screen w-full"
            style={{
                clipPath,
                backgroundSize,
                opacity,
                backgroundImage:
                    'url(https://kahimyang.com/resources/bonifacio-katipunan.jpg)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        />
    );
};

const ParallaxImages = () => {
    return (
        <div className="mx-auto max-w-5xl px-4 pt-[200px]">
            <ParallaxImg
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Andr%C3%A9s_Bonifacio_photo_%28cropped%29.jpg/220px-Andr%C3%A9s_Bonifacio_photo_%28cropped%29.jpg"
                alt="Andres Bonifacio"
                start={-200}
                end={200}
                className="w-1/3"
            />
            <ParallaxImg
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/PH_nhi_emilio_jacinto.jpg"
                alt="Emilio Jacinto"
                start={200}
                end={-250}
                className="mx-auto w-2/3"
            />
            <ParallaxImg
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/M.H.delPilaryGatmaitan.jpg/800px-M.H.delPilaryGatmaitan.jpg"
                alt="Marcelo H. Del Pilar"
                start={-200}
                end={200}
                className="ml-auto w-1/3"
            />
            <ParallaxImg
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Jose_Rizal_full.jpg/220px-Jose_Rizal_full.jpg"
                alt="Jose Rizal"
                start={0}
                end={-500}
                className="ml-24 w-5/12"
            />
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${end * -1}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            ref={ref}
            style={{ transform, opacity }}
        />
    );
};

const Schedule = () => {
    return (
        <section
            id="launch-schedule"
            className="mx-auto max-w-5xl px-4 py-48 text-white"
        >
            <motion.h1
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.75 }}
                className="mb-20 text-4xl font-black uppercase text-zinc-50"
            >
                Launch Schedule
            </motion.h1>
            <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
            <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
            <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
            <ScheduleItem
                title="Turksat 6A"
                date="Feb 22nd"
                location="Florida"
            />
            <ScheduleItem
                title="NROL-186"
                date="Mar 1st"
                location="California"
            />
            <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
            <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
        </section>
    );
};

const ScheduleItem = ({ title, date, location }) => {
    return (
        <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.75 }}
            className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
        >
            <div>
                <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
                <p className="text-sm uppercase text-zinc-500">{date}</p>
            </div>
            <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
                <p>{location}</p>
                <FiMapPin />
            </div>
        </motion.div>
    );
};
