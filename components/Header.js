'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
export const Header = () => {
    return (
        <div className="bg-white">
            <TitleContent
                mediaUrl="/media/intro.mp4"
                mediaType="video"
                subheading="Apaka sheeshable"
                heading="Ang Katipunan"
            >
                <ExampleContent />
            </TitleContent>
            <TextParallaxContent
                mediaUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                mediaType="image"
                subheading="Quality"
                heading="Never compromise."
            >
                <ExampleContent />
            </TextParallaxContent>
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
                className="absolute inset-0 bg-neutral-950/70"
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
    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.7, 0]);
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
            className="absolute left-0 top-0 flex h-[50vh] w-full flex-col items-center justify-center text-white"
        >
            <p className="text-center text-5xl font-bold md:text-7xl">
                {heading}
            </p>
            <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
                {subheading}
            </p>
        </motion.div>
    );
};

const ExampleContent = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
            Additional content explaining the above card here
        </h2>
        <div className="col-span-1 md:col-span-8">
            <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
                blanditiis soluta eius quam modi aliquam quaerat odit deleniti
                minima maiores voluptate est ut saepe accusantium maxime
                doloremque nulla consectetur possimus.
            </p>
            <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium reiciendis blanditiis aliquam aut fugit sint.
            </p>
            <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
                Learn more <FiArrowUpRight className="inline" />
            </button>
        </div>
    </div>
);
