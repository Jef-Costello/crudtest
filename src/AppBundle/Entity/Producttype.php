<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Query\ResultSetMapping;
/**
 * @ORM\Entity
 * @ORM\Table(name="producttypes")
  */
class Producttype
{


    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     *
     */
    protected $name;
    /**
     * @ORM\Column(type="text")
     *
     */
    protected $description;
    /**
     * @ORM\Column(type="string")
     *
     */
    protected $imageurl;
    /**
     * @var \Doctrine\Common\Collections\Collection|Product[]
   * One Producttype has Many Products.
     * @ORM\OneToMany(targetEntity="Product", mappedBy="producttype")
     */
    protected $products;

    /**
        * @ORM\OneToMany(targetEntity="Producttype", mappedBy="parent")
        */
       protected $children;

       /**
        * @ORM\ManyToOne(targetEntity="Producttype", inversedBy="children")
        * @ORM\JoinColumn(name="parent", referencedColumnName="id")
        */
       private $parent;

    public function __construct()
    {
        $this->products = new \Doctrine\Common\Collections\ArrayCollection();
        $this->children = new \Doctrine\Common\Collections\ArrayCollection();

    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Producttype
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Producttype
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Add product
     *
     * @param \AppBundle\Entity\Product $product
     *
     * @return Producttype
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
     * Get products
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * Set imageurl
     *
     * @param string $imageurl
     *
     * @return Producttype
     */
    public function setImageurl($imageurl)
    {
        $this->imageurl = $imageurl;

        return $this;
    }

    /**
     * Get imageurl
     *
     * @return string
     */
    public function getImageurl()
    {
        return $this->imageurl;
    }

    /**
     * Add child
     *
     * @param \AppBundle\Entity\Producttype $child
     *
     * @return Producttype
     */
    public function addChild(\AppBundle\Entity\Producttype $child)
    {
        $this->children[] = $child;

        return $this;
    }

    /**
     * Remove child
     *
     * @param \AppBundle\Entity\Producttype $child
     */
    public function removeChild(\AppBundle\Entity\Producttype $child)
    {
        $this->children->removeElement($child);
    }

    /**
     * Get children
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Set parent
     *
     * @param \AppBundle\Entity\Producttype $parent
     *
     * @return Producttype
     */
    public function setParent(\AppBundle\Entity\Producttype $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \AppBundle\Entity\Producttype
     */
    public function getParent()
    {
        return $this->parent;
    }
}
