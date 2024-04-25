<?php

class RoleHelper
{
    /**
     * Set security attribute
     * @param string $name The name of security attribute or group
     * @param array $options - In twig, {'visible': 1, 'create': 1, 'edit': 1, 'delete': 1} => ["visible" => 1, "create" => 1, "edit" => 1, "delete" => 1]
     * @param string|null $category
     * @param int $roleId
     * @return void
     * @throws \Psr\Cache\InvalidArgumentException
     */
    public function setSecurityAttribute($name, $options, string $category = null, int $roleId = 1)
    {
        $category = $category ?? "Default";
        $role = new Role();
        if ($role->load("id = ?", [$roleId])) {
            $roleData = unserialize($role->roleInfo);

            $roleData["roles"][$name] = array_merge($options, compact('category'));
            $roleData["category"][$category][$name] = array_merge($options, compact('category'));
        } else {

            $roleData = [];
            $roleData["roles"][$name] = array_merge($options, compact('category'));
            $roleData["category"][$category][$name] = array_merge($options, compact('category'));

            $role->id = $roleId;
            $role->name = "Default";
        }
        $role->roleInfo = serialize($roleData);
        $role->save();
    }

    /**
     * Get security attribute
     * @param string|null $name
     * @param int|null $roleId
     * @return mixed|void
     */
    public function getSecurityAttribute(?string $name = null, ?int $roleId = null)
    {
        $name = $name ?? "";
        $roleId = $roleId ?? 1;
        $role = new Role();
        if ($role->load("id = ?", [$roleId])) {
            $roles = unserialize($role->roleInfo);

            if (!empty($name)) {
                if (isset($roles["roles"])) {
                    return $roles["roles"][$name];
                } else {
                    return $roles[$name];
                }
            } else {
                if (isset($roles["category"])) {
                    return $roles["category"];
                } else {
                    return $roles;
                }
            }
        }
    }
}