<?php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="user")
 * @UniqueEntity("username")
 * @UniqueEntity("email")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     */
    protected $id;


    /**
     * @var \Doctrine\Common\Collections\Collection|Product[]
	 * One User has Many Products.
     * @ORM\OneToMany(targetEntity="Product", mappedBy="user")
     */
    protected $products;
    // ...







    protected $groups;
    public function __construct()
    {
        parent::__construct();
        $this->products = new ArrayCollection();
        // your own logic
    }
	 public function getProducts()
    {
        return $this->products;
    }
    public function getName()
     {
         return $this->userName;
     }
}