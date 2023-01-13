import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import useKeypress from "react-use-keypress";

const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
  "/images/14.jpg",
  "/images/15.jpg",
  "/images/16.jpg",
  "/images/17.jpg",
  "/images/18.jpg",
  "/images/19.jpg",
  "/images/20.jpg",
];

const collapsedAspectRatio = 1 / 3;
const expandedAspectRatio = 3 / 2;

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  });
  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) {
      setIndex(index + 1);
    }
  });

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-screen bg-black">
        <div className="mx-auto flex h-full flex-col items-center justify-center">
          <div className="relative max-w-[500px] overflow-hidden">
            <motion.div
              initial={false}
              animate={{ x: `-${index * 100}%` }}
              className="flex"
            >
              {images.map((image) => (
                <img
                  key={image}
                  src={image}
                  className="aspect-3/2 object-cover"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="mr-1 h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="ml-1 h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div>
            <div className="r absolute inset-x-0 bottom-6 flex justify-center overflow-hidden">
              <motion.div className="flex h-14 w-24 justify-center gap-1">
                {images.map((image, i) => (
                  <motion.button
                    animate={index === i ? "active" : "inactive"}
                    variants={{
                      active: {
                        aspectRatio: expandedAspectRatio,
                        marginLeft: 10,
                        marginRight: 10,
                        opacity: 1,
                      },
                      inactive: {
                        aspectRatio: collapsedAspectRatio,
                        marginLeft: 0,
                        marginRight: 0,
                        opacity: 0.8,
                      },
                    }}
                    whileHover={{ aspectRatio: 3 / 2, opacity: 1 }}
                    onClick={() => setIndex(i)}
                    className={` h-full shrink-0`}
                    key={image}
                  >
                    <img src={image} className={`h-full object-cover `} />
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
