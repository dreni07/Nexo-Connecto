import React from 'react';
import ImageUpload from './ImageUpload';
import TextInput from './TextInput';

interface Step1TellStoryProps {
    avatar: File | null;
    bio: string;
    onAvatarChange: (file: File | null) => void;
    onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onNext: () => void;
}

const Step1TellStory: React.FC<Step1TellStoryProps> = ({ 
    avatar, 
    bio, 
    onAvatarChange, 
    onBioChange, 
    onNext 
}) => {
    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6 font-outfit">
                    Tell Us Your Story!
                </h2>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <ImageUpload
                            value={avatar ? URL.createObjectURL(avatar) : null}
                            onChange={onAvatarChange}
                        />
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-sm font-medium text-foreground text-center font-outfit">
                                Profile Photo
                            </p>
                            <p className="text-xs text-muted-foreground text-center font-outfit max-w-md">
                                This photo will be used on your public profile
                            </p>
                            <span className="text-xs text-muted-foreground font-outfit italic">
                                Optional
                            </span>
                        </div>
                    </div>

                    <TextInput
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={onBioChange}
                        placeholder="Tell us about yourself..."
                        label="Bio"
                        multiline
                        rows={5}
                        maxLength={300}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button
                    type="button"
                    onClick={onNext}
                    className="h-11 px-8 rounded-lg text-white text-base font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md cursor-pointer font-outfit"
                    style={{ 
                        backgroundColor: '#CD5656',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#AF3E3E';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#CD5656';
                    }}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Step1TellStory;

