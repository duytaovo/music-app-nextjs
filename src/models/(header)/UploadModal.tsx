"use client";
import getDuration from "@/helpers/getDuration";
import useUploadModal from "@/hooks/(header)/useUploadModal";
import placeholder from "@/public/images/uploadSong.webp";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { cn } from "@/libs/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { GoUpload } from "react-icons/go";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { ImCheckmark } from "react-icons/im";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-toastify";
import LoadingModal from "../(content)/LoadingModal";
interface FormProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  text?: string;
  required: boolean;
}
const UploadModal = () => {
  const router = useRouter();
  const { isUploading, setUploading, showUploadModal, setShowUploadModal } =
    useUploadModal();
  const [selected, setSelected] = useState<string>("Khác");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<StaticImageData | string>(placeholder);
  const [audio, setAudio] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      singer: "",
      audio: "",
      image: "",
      type: "",
      link: "",
      duration: "",
    },
  });
  /* // Function */

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (audio === "") {
      toast.error("Missing audio file...");
      return;
    }
    if (!audio.includes("mp3")) {
      toast.error("It should be .mp3 file");
      return;
    }

    setUploading("");
    setLoading(true);
    data = {
      ...data,
      type: selected,
      image: typeof image === "string" ? image : "",
      audio,
      duration: getDuration(duration),
    };
    axios
      .post("/api/song", data)
      .then(() => {
        setUploading("updated");
        toast.success("Upload Successfully");
        setShowUploadModal(false);
        reset();
      })
      .catch((error) => {
        console.log(error), toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <LoadingModal show={isLoading} setShow={setLoading} />
      <Transition appear show={showUploadModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setShowUploadModal(false), reset();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-3/4  gap-2 rounded-2xl  bg-searchFocus  text-left align-middle shadow-xl ">
                  {/* // Heading */}
                  <div className="relative block md:hidden w-full">
                    <div
                      onClick={() => (reset(), setShowUploadModal(false))}
                      className="absolute top-0 right-0  -translate-x-1/3 -translate-y-1/2  w-10 h-10 rounded-full hover:opacity-80 hover:bg-fuchsia-400 flex items-center justify-center cursor-pointer "
                    >
                      <TfiClose
                        className="text-slate-950 hover:text-white"
                        size={24}
                      />
                    </div>
                  </div>
                  <div className=" w-full flex flex-col gap-4 sm:gap-8 p-4 ">
                    {/*// Title */}
                    <div className="w-full flex justify-center items-center">
                      <Dialog.Title
                        as="h3"
                        className="text-xl md:text-2xl  font-semibold leading-4 text-white "
                      >
                        Đăng tải bài hát
                      </Dialog.Title>
                    </div>
                    {/* //Content */}
                    <div className="flex flex-col items-center md:flex-row gap-4 md:gap-2 md:items-start">
                      {/* // Image */}
                      <div className="self-center sm:self-start w-1/2 sm:w-1/4 pt-2">
                        <Upload>
                          <ImageUpload type={image} setType={setImage} />
                        </Upload>
                      </div>
                      <div className="text-xds sm:text-sm flex flex-col gap-2 justify-start w-full md:w-3/4">
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-2">
                          {" "}
                          <div className="w-full sm:w-1/2 ">
                            <Input
                              id="title"
                              label="Tên bài hát"
                              register={register}
                              required={true}
                              errors={errors}
                            />
                          </div>
                          <div className="w-full sm:w-1/2 ">
                            <Input
                              id="link"
                              label="Link MV"
                              register={register}
                              required={false}
                              text="*Only YouTube video IDs (Optional)"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          {" "}
                          <div className="w-full sm:w-1/2">
                            <Input
                              id="singer"
                              label="Tên nghệ sĩ thể hiện"
                              register={register}
                              required={true}
                              errors={errors}
                            />
                          </div>
                          <div className="w-full sm:w-1/2 rounded-md outline-none  hover:opacity-90">
                            <SelectInput
                              selected={selected}
                              setSelected={setSelected}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="hover:bg-settingsFocus  w-full sm:w-1/2 cursor-pointer hover:opacity-80 rounded-md ">
                            <Upload>
                              <AudioUpload
                                type={audio}
                                //@ts-ignore
                                setType={setAudio}
                                setDuration={setDuration}
                              />
                            </Upload>
                          </div>
                          <div className="w-full sm:w-1/2 flex justify-center gap-3">
                            <div className="w-1/2">
                              <Click
                                type=""
                                reset={reset}
                                onClose={setShowUploadModal}
                              />
                            </div>
                            <div className="w-1/2">
                              <Click
                                type="submit"
                                onSubmit={handleSubmit(onSubmit)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UploadModal;
interface UploadProps {
  type: StaticImageData | string;
  setType: Dispatch<SetStateAction<StaticImageData | string>>;
  setDuration?: (value: number) => void;
}
function Upload({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}

const ImageUpload: React.FC<UploadProps> = ({ type, setType }) => {
  const uploadPreset = "kbjrbfku";
  const handleUpload = useCallback(
    (result: any) => {
      setType(result.info.secure_url);
    },
    [setType],
  );
  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="w-3/4  cursor-pointer hover:opacity-70 transition ring ring-offset-2 ring-fuchsia-500 overflow-hidden flex aspect-square justify-center items-center  "
          >
            {type && (
              <Image
                src={type}
                width={0}
                height={0}
                sizes="100vw"
                alt="Avatar"
                style={{ width: "100%", height: "auto" }}
                className="aspect-square object-cover "
              />
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

const AudioUpload: React.FC<UploadProps> = ({ type, setType, setDuration }) => {
  const uploadPreset = "kbjrbfku";
  const handleUpload = useCallback(
    (result: any) => {
      setType(result.info.secure_url);
      setDuration && setDuration(result.info.duration);
    },
    [setType, setDuration],
  );
  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="bg-transparent text-white  w-full rounded-md  p-2 border-settingsFocus border focus:outline-none "
          >
            <div className="flex gap-2">
              {" "}
              {type ? (
                <ImCheckmark color={"#65a30d"} size={20} />
              ) : (
                <GoUpload size={20} />
              )}
              <p>Upload your audio file!</p>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

const Input: React.FC<FormProps> = ({
  id,
  label,
  register,
  errors,
  text,
  required,
}) => {
  const message = errors?.[id]?.message as string;

  return (
    <div className="relative">
      {text && (
        <span className="px-1 text-fuchsia-500 font-semibold absolute top-0 -translate-y-full text-xx">
          {text}
        </span>
      )}
      <input
        id={id}
        placeholder={message || label}
        {...register(id, {
          required: required && "Please enter this field",
        })}
        type={"text"}
        className={cn(
          "bg-transparent text-white   w-full rounded-md  p-2 border-settingsFocus border focus:outline-none ring  ",
          errors?.[id] ? "ring-rose-500" : "ring-transparent",
          errors?.[id] ? "placeholder:text-rose-500" : "",
        )}
      />
    </div>
  );
};
interface SelectProps {
  selected: string;
  setSelected: (value: string) => void;
}
const SelectInput: React.FC<SelectProps> = ({ selected, setSelected }) => {
  const options = [
    "Việt Nam",
    "Âu Mỹ",
    "Hàn Quốc",
    "Nhật Bản",
    "Hoa Ngữ",
    "Khác",
  ];
  return (
    <div className="border-settingsFocus border rounded-md">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative  mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-transparent py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown className="h-5 w-5 " aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-[150px] w-full overflow-hidden overflow-y-auto rounded-md bg-searchFocus py-1 text-base shadow-lg  focus:outline-none sm:text-sm">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${
                      active && "bg-fuchsia-600 text-white"
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span
                          className={cn(
                            "absolute inset-y-0 left-0 flex items-center pl-3 ",
                            selected && active
                              ? "text-white "
                              : selected
                              ? "text-green-600 "
                              : "",
                          )}
                        >
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

function Click({
  type,
  onSubmit,
  onClose,
  reset,
}: {
  type: string;
  onSubmit?: () => void;
  onClose?: (value: boolean) => void;
  reset?: () => void;
}) {
  return (
    <div className="w-full">
      <button
        onClick={() => {
          type === "submit"
            ? onSubmit && onSubmit()
            : reset && onClose && (reset(), onClose(false));
        }}
        className="text-white text-center w-full rounded-full bg-fuchsia-600 px-4 py-2 focus:outline-none tracking-wide font-medium hover:opacity-80 flex items-center justify-center "
      >
        {type === "submit" ? (
          "Upload"
        ) : (
          <div className="flex items-center justify-center gap-2">
            <TfiClose size={20} />
            <span>Close</span>
          </div>
        )}
      </button>
    </div>
  );
}

