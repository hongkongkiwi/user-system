allow(actor, action, resource) if
  has_permission(actor, action, resource);

actor User {}

resource Org {
  roles = ["owner", "member"];
  permissions = [
    "read",
    "delete",
    "create_products",
    "list_products",
    "create_role_assignments",
    "list_role_assignments",
    "update_role_assignments",
    "delete_role_assignments",
  ];

  "read" if "member";
  "list_products" if "member";
  "list_role_assignments" if "member";

  "delete" if "owner";
  "create_products" if "owner";
  "create_role_assignments" if "owner";
  "update_role_assignments" if "owner";
  "delete_role_assignments" if "owner";

  "member" if "owner";
}

has_role(user: User, name: String, org: Org) if
    role in user.orgRole and
    role matches { role: name, org: org };

resource Project {
  roles = ["admin", "writer", "reader"];
  permissions = [
    "read",
    # "create_issues",
    # "list_issues",
    "create_role_assignments",
    "list_role_assignments",
    "update_role_assignments",
    "delete_role_assignments",
  ];
  relations = { parent: Org };

  "create_role_assignments" if "admin";
  "list_role_assignments" if "admin";
  "update_role_assignments" if "admin";
  "delete_role_assignments" if "admin";

  # "create_issues" if "writer";

  "read" if "reader";
  # "list_issues" if "reader";

  "admin" if "owner" on "parent";
  "reader" if "member" on "parent";

  "writer" if "admin";
  "reader" if "writer";
}

has_role(user: User, name: String, project: Project) if
    role in user.repoRole and
    role matches { role: name, project: project };

has_relation(org: Org, "parent", _: Project{org: org});

resource Issue {
  permissions = ["read"];
  relations = { parent: Repo };

  "read" if "reader" on "parent";
}

has_relation(repo: Repo, "parent", _: Issue{repo: repo});


### Misc rules

# Users can see each other.
# has_permission(_: User, "read", _: User);

# A User can read their own profile.
has_permission(_: User{id: id}, "read_profile", _:User{id: id});

# Any logged-in user can create a new org.
has_permission(_: User, "create", _: Org);