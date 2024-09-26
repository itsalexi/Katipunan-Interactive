'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
export const Top = () => {
    return (
        <div className="bg-[#181414]">
            <TitleContent
                mediaUrl="/media/intro.mp4"
                mediaType="video"
                subheading="ANG KATIPUNAN"
                heading="K. K. K."
            >
                <Content />
            </TitleContent>
        </div>
    );
};

const IMG_PADDING = 25;

const TextParallaxContent = ({
    mediaUrl,
    mediaType,
    subheading,
    heading,
    children,
}) => {
    return (
        <div
            style={{
                paddingLeft: IMG_PADDING,
                paddingRight: IMG_PADDING,
            }}
        >
            <div className="relative h-[150vh]">
                <StickyMedia mediaUrl={mediaUrl} mediaType={mediaType} />
                <OverlayCopy heading={heading} subheading={subheading} />
            </div>
            {children}
        </div>
    );
};

const TitleContent = ({
    mediaUrl,
    mediaType,
    subheading,
    heading,
    children,
}) => {
    return (
        <div
            style={{
                paddingLeft: IMG_PADDING,
                paddingRight: IMG_PADDING,
            }}
        >
            <div className="relative h-[150vh]">
                <StickyMedia mediaUrl={mediaUrl} mediaType={mediaType} />
                <OverlayCopy heading={heading} subheading={subheading} />
            </div>
            {children}
        </div>
    );
};

const StickyMedia = ({ mediaUrl, mediaType }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['end end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <motion.div
            style={{
                height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className="sticky z-0 overflow-hidden rounded-3xl"
        >
            {mediaType === 'image' ? (
                <motion.div
                    style={{
                        backgroundImage: `url(${mediaUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100%',
                        width: '100%',
                    }}
                />
            ) : (
                <motion.video
                    src={mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}
            <motion.div
                className="absolute inset-0 bg-[#181414/70]"
                style={{
                    opacity,
                }}
            />
        </motion.div>
    );
};

const OverlayCopy = ({ subheading, heading }) => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const color = useTransform(
        scrollYProgress,
        [0, 0.3, 1],
        ['#FFFFFF', '#FF0000', '#FF0000']
    );

    return (
        <motion.div
            style={{
                y,
                opacity,
                color,
            }}
            ref={targetRef}
            className="absolute left-0 top-0 flex h-[50vh] w-full flex-col items-center justify-center "
        >
            <p className="text-center text-5xl font-bold md:text-9xl">
                {heading}
            </p>
            <p className="font-serif mt-3 mb-5 text-center text-xl md:mb-4 md:text-3xl">
                {subheading}
            </p>
        </motion.div>
    );
};

const Content = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="text-white col-span-1 text-3xl font-bold md:col-span-4">
            Who are they?{' '}
        </h2>
        <div className="col-span-1 md:col-span-8">
            <p className="mb-4 text-xl text-white md:text-2xl">
                The Kataastaasan, Kagalanggalangang Katipunan ng mga Anak ng
                Bayan (Supreme and Venerable Association of the Children of the
                Nation), commonly known as the Katipunan, was a revolutionary
                society founded in the Philippines in 1892. Its primary aim was
                to gain independence from Spanish colonial rule through armed
                revolt.
            </p>
            <p className="mb-8 text-xl text-white md:text-2xl">
                In a time of oppression and injustice, the Katipunan emerged as
                a beacon of hope for the Filipino people. This secret society,
                born in the heart of Manila, would grow to become the driving
                force behind the Philippine Revolution of 1896.
            </p>
        </div>
    </div>
);
