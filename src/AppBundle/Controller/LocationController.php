<?php

namespace AppBundle\Controller;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;
use AppBundle\Entity\User;
use AppBundle\Entity\Product;
use AppBundle\Entity\Location;
use AppBundle\Entity\Group;
use AppBundle\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class LocationController extends FOSRestController implements ClassResourceInterface
{
    public static function slugify($text)
    {
        // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  // trim
  $text = trim($text, '-');

  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);

  // lowercase
  $text = strtolower($text);

        if (empty($text)) {
            return 'n-a';
        }

        return $text;
    }
    public function newAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $location = new Location();

        $LocationName=$request->get('name');
        $Description=$request->get('description');
        $Type=$request->get('ltype');
        $Address=$request->get('address');
        $lng=$request->get('lng');
        $lat=$request->get('lat');
        $location->setName($LocationName);
        $location->setUrl($this->slugify($LocationName));
        //to do : check doubles
        $location->setDescription($Description);
        $location->setType($Type);
        $location->setLng($lng);
        $location->setLat($lat);
        $location->setAddress($Address);
        $filename=$LocationName;
        $filename=preg_replace('/[^A-Za-z0-9_-]/', '', $filename);

        $img=$request->files->get('file');
        $cntr=0;
        while (file_exists('img/uploads/'.$filename.$cntr.'.jpg')) {
            $cntr+=1;
        }
        if ($img!=null) {
            move_uploaded_file($img, 'img/uploads/'.$filename.$cntr.'.jpg');
            $location->setImgUrl('img/uploads/'.$filename.$cntr.'.jpg');
          //  $location->setUseCustomImage(true);
        }
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $locationrepo = $em->getRepository("AppBundle:Location");
        $all=$locationrepo->findAll();
        //foreach($all as $al){

          //$al->setUrl( $this->slugify( $al->getName() ) );
      //  }
      //  $found=$repository->findOneBy(array('username'=>'erik'));
      //  echo $found->getName();exit;
        $user =  $this->get('security.token_storage')->getToken()->getUser();

        $storedlocations = $user->getLocations();
        $found=$locationrepo->findOneBy(array('type'=>'Primary','user'=>$user->getId()));
        $secondaries=$locationrepo->findBy(array('type'=>'Secondary','user'=>$user->getId()));
        //echo $found->getName();exit;
        if ($Type=='Primary'&&$found==null) {
            $location->setUser($user);
            $location->addUserd($user);
            $user->setProducer(1);
            foreach ($secondaries as $stl) {
                $location->addLocation($stl);
            }
            $em->persist($location);
            $em->flush();

            $locations=$locationrepo->findAll();
            foreach ($locations as $l) {
                $sublocs=$l->getLocations();
        //  echo $sublocs;exit;
          foreach ($sublocs as $sl) {
              $jsonsublocs[]=["name"=> $sl->getName(),"userid"=>$sl->getUser()->getId(),"imgurl"=>$sl->getImgurl(),"id"=>$sl->getId(),"description"=>$sl->getDescription(),"address"=>$sl->getAddress(),"lat"=>$sl->getLat(),"lng"=>$sl->getLng(),'type'=>$sl->getType()];
          }
                if (count($sublocs)==0) {
                    $jsonsublocs=[];
                }
                $jsonlocations[]=["name"=> $l->getName(),"id"=>$l->getId(),"userid"=>$l->getUser()->getId(),"imgurl"=>$l->getImgurl(),"description"=>$l->getDescription(),"address"=>$l->getAddress(),"lat"=>$l->getLat(),"lng"=>$l->getLng(),'type'=>$l->getType(),'sublocs'=>$jsonsublocs];
            }
            echo json_encode($jsonlocations);

            exit;
        } elseif ($Type=='Secondary') {
            $location->setUser($user);
            $location->addUserd($user);
            $em->persist($location);
            if ($found!=null) {
                $found->addLocation($location);

                $em->persist($found);
            } else {
                $em->persist($location);
            }
            $em->flush();
            $locations=$locationrepo->findAll();
            foreach ($locations as $l) {
                $sublocs=$l->getLocations();
          //  echo $sublocs;exit;
            foreach ($sublocs as $sl) {
                $jsonsublocs[]=["name"=> $sl->getName(),"userid"=>$sl->getUser()->getId(),"imgurl"=>$sl->getImgurl(),"id"=>$sl->getId(),"description"=>$sl->getDescription(),"address"=>$sl->getAddress(),"lat"=>$sl->getLat(),"lng"=>$sl->getLng(),'type'=>$sl->getType()];
            }
                if (count($sublocs)==0) {
                    $jsonsublocs=[];
                }
                $jsonlocations[]=["name"=> $l->getName(),"userid"=>$l->getUser()->getId(),"imgurl"=>$l->getImgurl(),"id"=>$l->getId(),"description"=>$l->getDescription(),"address"=>$l->getAddress(),"lat"=>$l->getLat(),"lng"=>$l->getLng(),'type'=>$l->getType(),'sublocs'=>$jsonsublocs];
            }
            echo json_encode($jsonlocations);
            exit;
        } else {
            echo 'allready stored a location for this user';
            exit;
        }
    }
    public function editAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $em = $this->getDoctrine()->getEntityManager();
        $locationrepo = $em->getRepository("AppBundle:Location");

        $LocationId=$request->get('id');
        $location=$locationrepo->findOneBy(array("id"=>$LocationId));
        $LocationName=$request->get('name');
        $location->setUrl($this->slugify($LocationName));
        $Description=$request->get('description');
        $location->setMonFrom( $request->get('monfrom')!=null ? new \DateTime($request->get('monfrom')) : null);
        $location->setMonTo( $request->get('monto')!=null ? new \DateTime($request->get('monto')) : null);
        $location->setTueFrom( $request->get('tuefrom')!=null ? new \DateTime($request->get('tuefrom')) : null);
        $location->setTueTo( $request->get('tueto')!=null ? new \DateTime($request->get('tueto')) : null);
        $location->setWedFrom( $request->get('wedfrom')!=null ? new \DateTime($request->get('wedfrom')) : null);
        $location->setWedTo( $request->get('wedto')!=null ? new \DateTime($request->get('wedto')) : null);
        $location->setThuFrom( $request->get('thufrom')!=null ? new \DateTime($request->get('thufrom')) : null);
        $location->setThuTo( $request->get('thuto')!=null ? new \DateTime($request->get('thuto')) : null);
        $location->setFriFrom( $request->get('frifrom')!=null ? new \DateTime($request->get('frifrom')) : null);
        $location->setFriTo( $request->get('frito')!=null ? new \DateTime($request->get('frito')) : null);
        $location->setSatFrom( $request->get('satfrom')!=null ? new \DateTime($request->get('satfrom')) : null);
        $location->setSatTo( $request->get('satto')!=null ? new \DateTime($request->get('satto')) : null);
        $location->setSunFrom( $request->get('sunfrom')!=null ? new \DateTime($request->get('sunfrom')) : null);
        $location->setSunTo( $request->get('sunto')!=null ? new \DateTime($request->get('sunto')) : null);
        //$Type=$request->query->get('type');
        $Address=$request->get('address');
        $lng=$request->get('lng');
        $lat=$request->get('lat');
        $location->setName($LocationName);
        $location->setDescription($Description);
        //$location->setType($Type);
        $location->setLng($lng);
        $location->setLat($lat);
        $location->setAddress($Address);
        $filename=$LocationName;
        $filename=preg_replace('/[^A-Za-z0-9_-]/', '', $filename);

        $img=$request->files->get('file');
        $cntr=0;
        while (file_exists('img/uploads/'.$filename.$cntr.'.jpg')) {
            $cntr+=1;
        }
        if ($img!=null) {
            move_uploaded_file($img, 'img/uploads/'.$filename.$cntr.'.jpg');
            $location->setImgUrl('img/uploads/'.$filename.$cntr.'.jpg');
          //  $location->setUseCustomImage(true);
        }

        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
      //  $locationrepo = $em->getRepository("AppBundle:Location");
      //  $found=$repository->findOneBy(array('username'=>'erik'));
      //  echo $found->getName();exit;
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        if (!$location->getUser()->getId()==$user->getId()) {
            echo "illegal";
            exit;
        }
        //$storedlocations = $user->getLocations();
        //$found=$locationrepo->findOneBy(array('type'=>'Primary','user'=>$user->getId()));
        //echo $found->getName();exit;
        //if($Type=='Primary'&&$found==null){
        //$location->setUser($user);
        //$user->setProducer(1);
        $em->persist($location);
        $em->flush();
        $jsonsublocs=[];
        $sublocs=$location->getLocations();
        foreach ($sublocs as $sl) {
            $jsonsublocs[]=["name"=> $sl->getName(),"id"=>$sl->getId(),"address"=>$sl->getAddress(),"description"=>$sl->getDescription(),'type'=>$sl->getType()];
        }
        $jsonlocation=["name"=> $location->getName(),"imgurl"=>$location->getImgUrl(),"userid"=>$user->getId(),"id"=>$location->getId(),"address"=>$location->getAddress(),"description"=>$location->getDescription(),'type'=>$location->getType(),'sublocs'=>$jsonsublocs];

        echo json_encode($jsonlocation);

        exit;//}
    }
    public function newsublocationAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $location = new Location();

        $LocationName=$request->query->get('LocationName');
        $Description=$request->query->get('description');
        $Type=$request->query->get('type');
        $Address=$request->query->get('address');
        $lng=$request->query->get('lng');
        $lat=$request->query->get('lat');
        $location->setName($LocationName);
        $location->setDescription($Description);
        $location->setType($Type);
        $location->setLng($lng);
        $location->setLat($lat);
        $location->setAddress($Address);
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $storedlocations = $user->getLocations();
        $found=$storedlocations->findBy(array('type'=>'primary','user'=>$user->getId()));
        echo $found->getName();
        exit;
        if (count($storedlocations)==0) {
            $location->setUser($user);
            $location->addUserd($user);
            $user->addDlocation($location);
            $em->persist($location);
            $em->persist($user);
            $em->flush();

            echo json_encode(["location"=>"added"]);

            exit;
        } else {
            echo 'allready stored a location for this user';
            exit;
        }
    }
    public function singleAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        //$ProductId=$request->query->get('ProductId');
        $locations=$user->getLocations();
        //$em = $this->getDoctrine()->getEntityManager();
        //$repository = $em->getRepository("AppBundle:Product");
        foreach ($locations as $l) {
            $sublocs=$locations->getLocations();
            foreach ($sublocs as $sl) {
                $jsonsublocs[]=["name"=> $sl->getName(),"id"=>$sl->getId(),"address"=>$sl->getAddress(),"description"=>$sl->getDescription(),'type'=>$sl->getType()];
            }
            $jsonlocations[]=["name"=> $l->getName(),"id"=>$l->getId(),"address"=>$sl->getAddress(),"description"=>$l->getDescription(),'type'=>$l->getType(),'sublocs'=>$jsonsublocs];
        }
        //$p=$repository->findOneById($ProductId);


        echo json_encode($jsonlocations);

        exit;
    }
    public function byurlAction(Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:Location");
        //$user =  $this->get('security.token_storage')->getToken()->getUser();
        //$ProductId=$request->query->get('ProductId');
        //$locations=$user->getLocations();
        //$em = $this->getDoctrine()->getEntityManager();
        //$repository = $em->getRepository("AppBundle:Product");
        $Url=$request->query->get('url');
        $l=$repository->findOneBy(array('Url'=>$Url));
        //foreach($locations as $l){
        $jsonsublocs=[];
        $products=$l->getProducts();
        $jsonproducts=[];
        foreach ($products as $product) {
            $locationsjson=[];
            $ls=$product->getLocations();
            foreach ($ls as $l) {
                $locationsjson[]=['name'=>$l->getName(),'id'=>$l->getId()];
            }
            $groupsjson=[];
            $grs=$product->getGroups();
            foreach ($grs as $g) {
                $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
            }
            $jsonproducts[]=$product->toJson();
        }
        $sublocs=$l->getUser()->getDlocations();
        foreach ($sublocs as $sl) {

          if($sl->getType()=="Secondary"){
            $jsonsublocs[]=["name"=> $sl->getName(),"id"=>$sl->getId(),"address"=>$sl->getAddress(),"description"=>$sl->getDescription(),'type'=>$sl->getType()];}
        }
        $monfrom=$l->getMonFrom();
        if($monfrom!=null)$monfrom=$monfrom->format('H:i');
        $monto=$l->getMonTo();
        if($monto!=null)$monto=$monto->format('H:i');

        $tuefrom=$l->getTueFrom();
        if($tuefrom!=null)$tuefrom=$tuefrom->format('H:i');
        $tueto=$l->getTueTo();
        if($tueto!=null)$tueto=$tueto->format('H:i');

        $wedfrom=$l->getWedFrom();
        if($wedfrom!=null)$wedfrom=$wedfrom->format('H:i');
        $wedto=$l->getWedTo();
        if($wedto!=null)$wedto=$wedto->format('H:i');

        $thufrom=$l->getThuFrom();
        if($thufrom!=null)$thufrom=$thufrom->format('H:i');
        $thuto=$l->getThuTo();
        if($thuto!=null)$thuto=$thuto->format('H:i');

        $frifrom=$l->getFriFrom();
        if($frifrom!=null)$frifrom=$frifrom->format('H:i');
        $frito=$l->getFriTo();
        if($frito!=null)$frito=$frito->format('H:i');

        $satfrom=$l->getSatFrom();
        if($satfrom!=null)$satfrom=$satfrom->format('H:i');
        $satto=$l->getSatTo();
        if($satto!=null)$satto=$satto->format('H:i');

        $sunfrom=$l->getSunFrom();
        if($sunfrom!=null)$sunfrom=$sunfrom->format('H:i');
        $sunto=$l->getSunTo();
        if($sunto!=null)$sunto=$sunto->format('H:i');
        $jsonlocation=["name"=> $l->getName(),
        "id"=>$l->getId(),
        "address"=>$l->getAddress(),
        "description"=>$l->getDescription(),
        'imgurl'=>$l->getImgUrl(),
        'type'=>$l->getType(),
        'monfrom'=>$monfrom,
        'monto'=>$monto,
        'tuefrom'=>$tuefrom,
        'tueto'=>$tueto,
        'wedfrom'=>$wedfrom,
        'wedto'=>$wedto,
        'thufrom'=>$thufrom,
        'thuto'=>$thuto,
        'frifrom'=>$frifrom,
        'frito'=>$frito,
        'satfrom'=>$satfrom,
        'satto'=>$satto,
        'sunfrom'=>$sunfrom,
        'sunto'=>$sunto,



        'sublocs'=>$jsonsublocs];

        //$p=$repository->findOneById($ProductId);


        echo json_encode(["location"=>$jsonlocation,"products"=>$jsonproducts]);

        exit;
    }

    public function getallAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }

        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $products=$user->getProducts();
        $jsonproducts=[];
        foreach ($products as $p) {
            $groupsjson=[];
            $grs=$p->getGroups();
            foreach ($grs as $g) {
                $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
            }
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson];
        }
        echo json_encode($jsonproducts);

        exit;
    }
    public function getallpublicAction(Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:product");
       //$user =  $this->get('security.token_storage')->getToken()->getUser();
       $products=$repository->findAll();
        $jsonproducts=[];
        foreach ($products as $p) {
            $groupsjson=[];
            $grs=$p->getGroups();
            $user=$p->getUser();
            $uid='none';
            $uname='';
            if ($user!=null) {
                $uid=$user->getId();
                $uname=$user->getName();
            }

            foreach ($grs as $g) {
                $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
            }
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId(),"description"=>$p->getDescription(),'groups'=>$groupsjson,'userid'=>$uid,'username'=>$uname];
        }
        echo json_encode($jsonproducts);

        exit;
    }

    public function locationdeleteAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $locationId=$request->query->get('locationId');
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $products=$user->getProducts();

        $location = $this->getDoctrine()
       ->getRepository('AppBundle:Location')
       ->find($locationId);
        if ($location->getUser()==$user) {
            $em->remove($location);
            $em->flush();
        }
        foreach($product as $p){ $p->removeLocation($location); };
        echo 'location deleted';
        exit;
    }
    public function editproductAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        $productId=$request->query->get('ProductId');
        $productName=$request->query->get('ProductName');
        $productDescription=$request->query->get('ProductDescription');
        $em = $this->getDoctrine()->getEntityManager();
        $repository = $em->getRepository("AppBundle:User");
        $user =  $this->get('security.token_storage')->getToken()->getUser();
        $product = $this->getDoctrine()
       ->getRepository('AppBundle:Product')
       ->find($productId);
        if ($product->getUser()==$user) {
            $product->setName($productName);
            $product->setDescription($productDescription);
            $groups = $em->getRepository("AppBundle:Group");
            $gid=[];
            $savedgroup= $product->getGroups();
            foreach ($savedgroup as $sg) {
                $gid[]=$sg->getId();//to do : find right method for this
            }
            $indx=1;
            foreach ($request->query->get('g') as $g) {
                if ($g=='true') {
                    $group=$groups->findOneById($indx);
                    if (!in_array($group->getId(), $gid)) {
                        $product->addGroup($group);
                    }
                }
                if ($g=='false') {
                    $group=$groups->findOneById($indx);
                    if (in_array($group->getId(), $gid)) {
                        $product->removeGroup($group);
                    }
                }
                $indx++;
            }
            $em->flush();
        }
        $products=$user->getProducts();
        $groupsjson=[];
        $grs=$product->getGroups();
        foreach ($grs as $g) {
            $groupsjson[]=['groupname'=>$g->getName(),'groupid'=>$g->getId()];
        }
        $jsonproducts=[];
        foreach ($products as $p) {
            $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId()];
        }
        echo json_encode(["name"=> $product->getName(),"id"=>$product->getId(),'description'=>$product->getDescription(),'groups'=>$groupsjson]);

        exit;
    }
    public function cgetAction(Request $request)
    {
        if (!$this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            throw $this->createAccessDeniedException();
        }
        if ($request->query->get('object')=='products') {
            $em = $this->getDoctrine()->getEntityManager();
            $repository = $em->getRepository("AppBundle:User");
            $users = $repository->findAll();

            $userId=$this->get('security.token_storage')->getToken()->getUser()->getId();
            $user = $this->getDoctrine()
        ->getRepository('AppBundle:User')
        ->find($userId);
            $products=$user->getProducts();
            $jsonproducts=[];

            foreach ($products as $p) {
                $jsonproducts[]=["name"=> $p->getName(),"id"=>$p->getId()];
            }
            echo json_encode($jsonproducts);
            exit;
        } else {
            echo json_encode(['error'=>'unknown object']);
            exit;
        }
        $view = $this->view($products, 200)
            ->setTemplate("default/users.html.twig")
            ->setTemplateVar('users')
        ;
        return $this->handleView($view);
    }
}
