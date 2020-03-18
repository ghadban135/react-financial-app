<?php

namespace MyApp\DB;

class Currency
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getCurrencies()
    {

        $query = 'SELECT * FROM currencies';

        try {
            $statement = $this->db->prepare($query);
            $statement->execute();

            $rows = $statement->fetchAll();
            if (count($rows) === 0) {
                throw new \RuntimeException('Contacts are empty!');
            }
            return $rows;
        } catch (\Exception $error) {
            throw new \RuntimeException('Could not retrieve list of contacts');
        }
    }

    public function getCurrencyByID($id)
    {
        $query = "SELECT * FROM currencies where id= :id";
        try {
            $statement = $this->db->prepare($query);

            $statement->execute([':id' => $id]);

            // Fetch is used to fetch 1 row while fetchAll is used to return multiple rows
            $row = $statement->fetch();

            if ($row === null) {
                throw new \RuntimeException("Currency with id $id is not found");
            }
            return $row;
        } catch (\Exception $error) {
            throw new \RuntimeException("Could not retrieve list of contacts");
        }
    }


    public function createContact($props)
    {
        extract($props);

        // var_dump($props);
        if (!isset($props) || !isset($name) || !isset($email)) {
            throw new \RuntimeException('You must provide a name and email');
        }

        try {
            $query = 'Insert into contacts (name, email) values (:name, :email)';

            $statement = $this->db->prepare($query);
            $statement->execute([':name' => $name, ':email' => $email]);

            return $this->db->lastInsertId();
        } catch (\Exception $error) {
            throw new \Exception("This combination doesn't work");
        }
    }

    public function deleteContact($id)
    {
        $query = "Delete from contacts where contact_id = :contact_id";

        try {
            $statement = $this->db->prepare($query);
            $statement->execute([':contact_id' => $id]);

            if ($statement->rowCount() === 0) {
                throw new \Exception("Contact with id $id doesn't exist");
            }
            return true;
        } catch (\Exception $error) {
            throw new \Exception("Could not delete contact with id $id, " . $error->getMessage());
        }
    }

    public function updateContact($props)
    {
        extract($props);
        if (!isset($props['id'])) {
            throw new \Exception('Contact Id must be provided');
            return;
        }
        if ((!isset($props['name']) && !isset($props['email']))) {
            throw new \Exception('You must provide a name or an email');
        }

        try {
            $query = '';
            if (isset($name) && isset($email)) {
                $query = 'update contacts set name = :name, email = :email where contact_id = :contact_id';
                $statement = $this->db->prepare($query);
                $statement->execute([':email' => $email, ':name' => $name, ':contact_id' => $id]);
            } elseif (isset($name)) {
                $query = 'update contacts set name = :name where contact_id = :contact_id';
                $statement = $this->db->prepare($query);
                $statement->execute([':name' => $name, ':contact_id' => $id]);
            } else {
                $query = 'update contacts set  email = :email where contact_id = :contact_id ';
                $statement = $this->db->prepare($query);
                $statement->execute([':email' => $email, ':contact_id' => $id]);
            }

            if ($statement->rowCount() === 0) {
                throw new \Exception("Contact with id $id doesn't exist");
            }
        } catch (\Exception $error) {
            return true;
            throw new \Exception("Could not update contact with id $id " . $error->getMessage());
        }
    }
}
