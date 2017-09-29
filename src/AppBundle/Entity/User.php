<?php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;
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
     * @ORM\Column(type="boolean")
     *
     */
    protected $producer;

    /**
     * @var \Doctrine\Common\Collections\Collection|Product[]
	 * One User has Many Products.
     * @ORM\OneToMany(targetEntity="Product", mappedBy="user")
     */
    protected $products;
    // ...

    /**
     * @var \Doctrine\Common\Collections\Collection|Shop[]
    * One User has Many Shops.
     * @ORM\OneToMany(targetEntity="Shop", mappedBy="user")
     */
    protected $shops;


    /**
     * @var \Doctrine\Common\Collections\Collection|Location[]
    * One User has Many Locations.
     * @ORM\OneToMany(targetEntity="Location", mappedBy="user")
     */
    protected $locations;




    public function __construct()
    {
        parent::__construct();
        $this->products = new ArrayCollection();
      $this->shops = new ArrayCollection();
        $this->locations = new ArrayCollection();
    }
	 public function getProducts()
    {
        return $this->products;
    }
    public function getName()
     {
         return $this->username;
     }

    /**
     * Add product
     *
     * @param \AppBundle\Entity\Product $product
     *
     * @return User
     */
    public function addProduct(\AppBundle\Entity\Product $product)
    {
        $this->products[] = $product;

        return $this;
    }

    /**
     * Remove product
     *
     * @param \AppBundle\Entity\Product $product
     */
    public function removeProduct(\AppBundle\Entity\Product $product)
    {
        $this->products->removeElement($product);
    }

    /**
     * Add shop
     *
     * @param \AppBundle\Entity\Shop $shop
     *
     * @return User
     */
    public function addShop(\AppBundle\Entity\Shop $shop)
    {
        $this->shops[] = $shop;

        return $this;
    }

    /**
     * Remove shop
     *
     * @param \AppBundle\Entity\Shop $shop
     */
    public function removeShop(\AppBundle\Entity\Shop $shop)
    {
        $this->shops->removeElement($shop);
    }

    /**
     * Get shops
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getShops()
    {
        return $this->shops;
    }

    /**
     * Add location
     *
     * @param \AppBundle\Entity\Location $location
     *
     * @return User
     */
    public function addLocation(\AppBundle\Entity\Location $location)
    {
        $this->locations[] = $location;

        return $this;
    }

    /**
     * Remove location
     *
     * @param \AppBundle\Entity\Location $location
     */
    public function removeLocation(\AppBundle\Entity\Location $location)
    {
        $this->locations->removeElement($location);
    }

    /**
     * Get locations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLocations()
    {
        return $this->locations;
    }

    /**
     * Set producer
     *
     * @param boolean $producer
     *
     * @return User
     */
    public function setProducer($producer)
    {
        $this->producer = $producer;

        return $this;
    }

    /**
     * Get producer
     *
     * @return boolean
     */
    public function getProducer()
    {
        return $this->producer;
    }
}
