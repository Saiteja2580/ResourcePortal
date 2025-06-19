import React from "react";

const user = {
  id: "A12345",
  full_name: "John Doe",
  email: "john.doe@example.com",
  department: "Computer Science",
};

const ProfilesPage = () => {
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
          {user.id}
        </div>
      </div>
      <div className="mb-5">
        <span className="text-[var(--text-secondary)] font-medium text-base block mb-1">
          Full Name
        </span>
        <div className="text-[var(--text-primary)] text-lg font-normal mb-3 bg-[var(--color-muted)] rounded-md py-2 px-4 shadow-sm">
          {user.full_name}
        </div>
      </div>
      <div className="mb-5">
        <span className="text-[var(--text-secondary)] font-medium text-base block mb-1">
          Email
        </span>
        <div className="text-[var(--text-primary)] text-lg font-normal mb-3 bg-[var(--color-muted)] rounded-md py-2 px-4 shadow-sm">
          {user.email}
        </div>
      </div>
      <div>
        <span className="text-[var(--text-secondary)] font-medium text-base block mb-1">
          Department
        </span>
        <div className="text-[var(--text-primary)] text-lg font-normal bg-[var(--color-muted)] rounded-md py-2 px-4 shadow-sm">
          {user.department}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
