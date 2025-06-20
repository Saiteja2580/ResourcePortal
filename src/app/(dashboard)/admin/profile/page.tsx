'use client';

import { getProfile } from "@/services/profile";
import React, { useEffect, useState } from "react";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  department: string;
  // add other fields if needed
}

const ProfilesPage = () => {
  const [profile, setProfile] = useState<Profile>({
    id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const result = await getProfile();
      console.log(result);
      

      if (result.success && result.profile) {
        setProfile(result.profile);
        setMessage("");
      } else {
        setMessage(result.message || "Failed to fetch profile.");
        setProfile({
          id: "",
          full_name: "",
          email: "",
          department: "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-card text-card-foreground shadow-[var(--shadow-card)] rounded-2xl p-10 max-w-md mx-auto my-8 font-body border border-[var(--color-border)]">
      <div className="font-heading text-3xl mb-6 text-center font-semibold text-[var(--text-primary)]">
        Profile
      </div>
      <div className="mb-5">
        <span className="text-[var(--text-secondary)] font-medium text-base block mb-1">
          ID
        </span>
        <div className="text-[var(--text-primary)] text-lg font-normal mb-3 bg-[var(--color-muted)] rounded-md py-2 px-4 shadow-sm">
          {profile.id}
        </div>
      </div>
      <div className="mb-5">
        <span className="text-[var(--text-secondary)] font-medium text-base block mb-1">
          Full Name
        </span>
        <div className="text-[var(--text-primary)] text-lg font-normal mb-3 bg-[var(--color-muted)] rounded-md py-2 px-4 shadow-sm">
          {profile.full_name}
        </div>
      </div>
      <div className="mb-5">
        <span className="text-[var(--text-secondary)] font-medium text-base block mb-1">
          Email
        </span>
        <div className="text-[var(--text-primary)] text-lg font-normal mb-3 bg-[var(--color-muted)] rounded-md py-2 px-4 shadow-sm">
          {profile.email}
        </div>
      </div>
      <div>
        <span className="text-[var(--text-secondary)] font-medium text-base block mb-1">
          Department
        </span>
        <div className="text-[var(--text-primary)] text-lg font-normal bg-[var(--color-muted)] rounded-md py-2 px-4 shadow-sm">
          {profile.department}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
